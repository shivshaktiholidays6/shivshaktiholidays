import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { Json } from "@/lib/supabase/database.types";

export const runtime = "nodejs";

const allowedTypes = new Set(["general", "package", "popup", "plan_trip"]);
const rateLimitWindowMs = 10 * 60 * 1000;
const maximumRequestsPerWindow = 5;
const requestBuckets = new Map<string, { count: number; expiresAt: number }>();

function cleanString(value: unknown, maximumLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maximumLength);
}

function optionalString(value: unknown, maximumLength: number) {
  const cleaned = cleanString(value, maximumLength);
  return cleaned || null;
}

function optionalInteger(value: unknown, minimum: number, maximum: number) {
  if (value === undefined || value === null || value === "") return null;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < minimum || parsed > maximum) return null;
  return parsed;
}

function optionalDate(value: unknown) {
  const cleaned = cleanString(value, 10);
  if (!cleaned) return null;
  return /^\d{4}-\d{2}-\d{2}$/.test(cleaned) ? cleaned : null;
}

function clientIdentifier(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous"
  );
}

function isRateLimited(identifier: string) {
  const now = Date.now();

  if (requestBuckets.size > 1_000) {
    for (const [key, value] of requestBuckets) {
      if (value.expiresAt <= now) requestBuckets.delete(key);
    }
  }
  if (requestBuckets.size > 10_000) {
    const oldestKey = requestBuckets.keys().next().value as string | undefined;
    if (oldestKey) requestBuckets.delete(oldestKey);
  }

  const bucket = requestBuckets.get(identifier);

  if (!bucket || bucket.expiresAt <= now) {
    requestBuckets.set(identifier, { count: 1, expiresAt: now + rateLimitWindowMs });
    return false;
  }

  bucket.count += 1;
  return bucket.count > maximumRequestsPerWindow;
}

function enquiryCode() {
  const time = Date.now().toString(36).toUpperCase();
  const random = crypto.randomUUID().replaceAll("-", "").slice(0, 5).toUpperCase();
  return `SSH-${time}-${random}`;
}

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if ((origin && origin !== requestUrl.origin) || fetchSite === "cross-site") {
    return NextResponse.json({ message: "Cross-site enquiry requests are not allowed." }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ message: "Enquiries must use JSON." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 16_000) {
    return NextResponse.json({ message: "Enquiry is too large." }, { status: 413 });
  }

  if (isRateLimited(clientIdentifier(request))) {
    return NextResponse.json(
      { message: "Too many enquiries were submitted. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

  let parsedBody: unknown;
  try {
    parsedBody = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid enquiry request." }, { status: 400 });
  }
  if (!parsedBody || typeof parsedBody !== "object" || Array.isArray(parsedBody)) {
    return NextResponse.json({ message: "Invalid enquiry request." }, { status: 400 });
  }
  const body = parsedBody as Record<string, unknown>;

  const type = cleanString(body["type"], 30);
  const name = cleanString(body["name"], 80);
  const phone = cleanString(body["phone"], 20);
  const email = cleanString(body["email"], 120).toLowerCase();
  const source = cleanString(body["source"], 80) || "website";
  const consent = body["consent"] === true;

  if (!allowedTypes.has(type)) {
    return NextResponse.json({ message: "Invalid enquiry type." }, { status: 400 });
  }
  if (name.length < 2) {
    return NextResponse.json({ message: "Please enter your name." }, { status: 400 });
  }
  if (!/^[+\d\s-]{7,20}$/.test(phone)) {
    return NextResponse.json({ message: "Please enter a valid phone number." }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json({ message: "Contact consent is required." }, { status: 400 });
  }

  const code = enquiryCode();
  if (cleanString(body["company"], 120)) {
    return NextResponse.json({ enquiryCode: code }, { status: 201 });
  }

  const metadata =
    body["metadata"] && typeof body["metadata"] === "object" && !Array.isArray(body["metadata"])
      ? body["metadata"]
      : {};
  if (JSON.stringify(metadata).length > 4_000) {
    return NextResponse.json({ message: "Enquiry details are too large." }, { status: 400 });
  }

  const preferences = Array.isArray(body["preferences"])
    ? body["preferences"]
        .filter((item): item is string => typeof item === "string")
        .slice(0, 12)
        .map((item) => item.trim().slice(0, 60))
    : [];

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { message: "Enquiry storage is not configured yet. Please contact us on WhatsApp." },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("enquiries").insert({
    enquiry_code: code,
    type,
    status: "new",
    source,
    name,
    phone,
    email,
    consent,
    destination: optionalString(body["destination"], 120),
    destination_slug: optionalString(body["destinationSlug"], 120),
    departure_city: optionalString(body["departureCity"], 100),
    package_name: optionalString(body["packageName"], 160),
    package_slug: optionalString(body["packageSlug"], 160),
    travel_start: optionalDate(body["travelStart"]),
    travel_end: optionalDate(body["travelEnd"]),
    travellers: optionalInteger(body["travellers"], 1, 100),
    adults: optionalInteger(body["adults"], 0, 100),
    children: optionalInteger(body["children"], 0, 100),
    infants: optionalInteger(body["infants"], 0, 100),
    days: optionalInteger(body["days"], 1, 365),
    preferences,
    budget: optionalString(body["budget"], 100),
    message: optionalString(body["message"], 1_000),
    page_path: optionalString(body["pagePath"], 300),
    utm_source: optionalString(body["utmSource"], 120),
    utm_medium: optionalString(body["utmMedium"], 120),
    utm_campaign: optionalString(body["utmCampaign"], 160),
    metadata: metadata as Json,
  });

  if (error) {
    console.error("Supabase enquiry insert failed", { code: error.code });
    return NextResponse.json(
      { message: "We could not save your enquiry. Please try again or contact us on WhatsApp." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { enquiryCode: code },
    { status: 201, headers: { "Cache-Control": "no-store" } },
  );
}
