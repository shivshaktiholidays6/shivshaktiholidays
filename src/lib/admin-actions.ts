"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminEmail, requireAdminUser } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { Json } from "@/lib/supabase/database.types";
import { site } from "@/config/site";
import { promotionCacheTag } from "@/lib/promotions";
import sharp from "sharp";

const enquiryStatuses = new Set(["new", "contacted", "quoted", "confirmed", "lost"]);
const packageScopes = new Set(["domestic", "international"]);
const packageImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const promotionPlacements = new Set(["sitewide", "homepage"]);
const promotionThemes = new Set(["diwali", "gold", "navy"]);

function addResultToUrl(returnTo: string, key: "error" | "updated" | "deleted", value: string) {
  const [pathname = "/admin", query = ""] = returnTo.split("?", 2);
  const params = new URLSearchParams(query);
  params.set(key, value);
  return `${pathname}?${params.toString()}`;
}

export async function adminLogin(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const supabase = await getSupabaseServerClient();

  if (!supabase) redirect("/admin/login?error=configuration");
  if (!email || !password) redirect("/admin/login?error=required");

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) redirect("/admin/login?error=invalid");

  if (!isAdminEmail(data.user.email)) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=unauthorized");
  }

  redirect("/admin");
}

export async function adminLogout() {
  const supabase = await getSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}

export async function updateEnquiryStatus(formData: FormData) {
  await requireAdminUser();

  const enquiryId = String(formData.get("enquiryId") ?? "");
  const status = String(formData.get("status") ?? "");
  const returnTo = String(formData.get("returnTo") ?? "/admin");
  const safeReturnTo = returnTo.startsWith("/admin") ? returnTo : "/admin";

  if (!/^[0-9a-f-]{36}$/i.test(enquiryId) || !enquiryStatuses.has(status)) {
    redirect(addResultToUrl(safeReturnTo, "error", "invalid-status"));
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) redirect(addResultToUrl(safeReturnTo, "error", "configuration"));

  const { error } = await supabase.from("enquiries").update({ status }).eq("id", enquiryId);
  if (error) redirect(addResultToUrl(safeReturnTo, "error", "update-failed"));

  revalidatePath("/admin");
  revalidatePath(`/admin/enquiries/${enquiryId}`);
  redirect(addResultToUrl(safeReturnTo, "updated", "1"));
}

export async function deleteEnquiry(formData: FormData) {
  await requireAdminUser();

  const enquiryId = String(formData.get("enquiryId") ?? "");
  const returnTo = String(formData.get("returnTo") ?? "/admin/enquiries");
  const safeReturnTo = returnTo.startsWith("/admin") ? returnTo : "/admin/enquiries";

  if (!/^[0-9a-f-]{36}$/i.test(enquiryId)) {
    redirect(addResultToUrl(safeReturnTo, "error", "invalid-enquiry"));
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) redirect(addResultToUrl(safeReturnTo, "error", "configuration"));

  const { error } = await supabase.from("enquiries").delete().eq("id", enquiryId);
  if (error) redirect(addResultToUrl(safeReturnTo, "error", "delete-failed"));

  revalidatePath("/admin");
  revalidatePath("/admin/enquiries");
  redirect(addResultToUrl(safeReturnTo, "deleted", "1"));
}

function value(formData: FormData, name: string, maximumLength: number) {
  return String(formData.get(name) ?? "")
    .trim()
    .slice(0, maximumLength);
}

function lineList(formData: FormData, name: string, maximumItems = 30) {
  return value(formData, name, 8_000)
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, maximumItems);
}

function packageSlug(input: string) {
  return input
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 120);
}

function optionalPublicUrl(raw: string) {
  if (!raw) return null;
  if (raw.startsWith("/") && !raw.startsWith("//")) return raw;
  try {
    const parsed = new URL(raw);
    return parsed.protocol === "https:" ? parsed.toString() : undefined;
  } catch {
    return undefined;
  }
}

function canonicalUrl(raw: string) {
  if (!raw) return null;
  try {
    const parsed = new URL(raw, site.url);
    if (parsed.origin !== new URL(site.url).origin) return undefined;
    parsed.search = "";
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return undefined;
  }
}

async function saveSlugRedirect(
  contentType: "package" | "destination",
  oldSlug: string,
  newSlug: string,
) {
  if (oldSlug === newSlug) return;
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  await supabase
    .from("content_redirects")
    .delete()
    .eq("content_type", contentType)
    .eq("old_slug", newSlug);
  await supabase
    .from("content_redirects")
    .update({ new_slug: newSlug })
    .eq("content_type", contentType)
    .eq("new_slug", oldSlug);
  await supabase
    .from("content_redirects")
    .upsert(
      { content_type: contentType, old_slug: oldSlug, new_slug: newSlug },
      { onConflict: "content_type,old_slug" },
    );
}

function itineraryFromForm(formData: FormData): Json {
  return lineList(formData, "itinerary", 60).flatMap((line) => {
    const separator = line.indexOf("|");
    if (separator < 1) return [];
    const title = line.slice(0, separator).trim().slice(0, 160);
    const text = line
      .slice(separator + 1)
      .trim()
      .slice(0, 1_000);
    return title && text ? [{ title, text }] : [];
  });
}

async function packageImageUrl(formData: FormData, slug: string, currentImageUrl: string | null) {
  const image = formData.get("imageFile");
  const manualUrl = value(formData, "imageUrl", 1_000);
  if (!(image instanceof File) || image.size === 0) {
    const candidate = manualUrl || currentImageUrl;
    if (!candidate) return null;
    if (candidate.startsWith("/")) return candidate;
    try {
      const parsed = new URL(candidate);
      return parsed.protocol === "https:" &&
        parsed.hostname.endsWith(".supabase.co") &&
        parsed.pathname.startsWith("/storage/v1/object/public/")
        ? candidate
        : null;
    } catch {
      return null;
    }
  }
  if (image.size > 5 * 1024 * 1024 || !packageImageTypes.has(image.type)) return null;

  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const imageBuffer = Buffer.from(await image.arrayBuffer());
  const metadata = await sharp(imageBuffer).metadata();
  if (!metadata.width || !metadata.height || metadata.width < 1600 || metadata.height < 900) {
    return null;
  }
  const extension =
    image.type === "image/png"
      ? "png"
      : image.type === "image/avif"
        ? "avif"
        : image.type === "image/webp"
          ? "webp"
          : "jpg";
  const objectPath = `${slug}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from("package-images").upload(objectPath, imageBuffer, {
    contentType: image.type,
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) return null;
  return supabase.storage.from("package-images").getPublicUrl(objectPath).data.publicUrl;
}

export async function savePackage(formData: FormData) {
  await requireAdminUser();
  const supabase = getSupabaseAdmin();
  if (!supabase) redirect("/admin/packages?error=configuration");

  const id = value(formData, "id", 36);
  const name = value(formData, "name", 160);
  const slug = packageSlug(value(formData, "slug", 160) || name);
  const destinationSlug = packageSlug(value(formData, "destinationSlug", 160));
  const place = value(formData, "place", 200);
  const scope = value(formData, "scope", 30);
  const summary = value(formData, "summary", 1_000);
  const socialImageUrl = optionalPublicUrl(value(formData, "socialImageUrl", 1_000));
  const customCanonicalUrl = canonicalUrl(value(formData, "canonicalUrl", 1_000));
  const nights = Number(value(formData, "nights", 3));
  const price = Number(value(formData, "price", 10));
  const editPath = id ? `/admin/packages/${id}/edit` : "/admin/packages/new";

  if (
    !name ||
    !slug ||
    !destinationSlug ||
    !place ||
    !packageScopes.has(scope) ||
    !summary ||
    !Number.isInteger(nights) ||
    nights < 1 ||
    nights > 60 ||
    !Number.isInteger(price) ||
    price < 0 ||
    socialImageUrl === undefined ||
    customCanonicalUrl === undefined
  ) {
    redirect(`${editPath}?error=validation`);
  }

  let currentImageUrl: string | null = null;
  let currentDestinationSlug: string | null = null;
  let currentSlug: string | null = null;
  if (id) {
    const { data } = await supabase
      .from("packages")
      .select("image_url, destination_slug, slug")
      .eq("id", id)
      .maybeSingle();
    currentImageUrl = data?.image_url ?? null;
    currentDestinationSlug = data?.destination_slug ?? null;
    currentSlug = data?.slug ?? null;
  }
  const imageUrl = await packageImageUrl(formData, slug, currentImageUrl);
  if (!imageUrl) redirect(`${editPath}?error=image`);

  const types = formData
    .getAll("types")
    .map(String)
    .map((item) => item.trim().slice(0, 80))
    .filter(Boolean)
    .slice(0, 20);
  const payload = {
    slug,
    name,
    destination_slug: destinationSlug,
    place,
    scope,
    nights,
    price,
    types: types.length ? types : ["Customized"],
    image_url: imageUrl,
    image_alt: value(formData, "imageAlt", 240) || `${name} holiday package`,
    image_position: value(formData, "imagePosition", 80) || "center",
    summary,
    highlights: lineList(formData, "highlights"),
    itinerary: itineraryFromForm(formData),
    inclusions: lineList(formData, "inclusions"),
    exclusions: lineList(formData, "exclusions"),
    most_booked: formData.get("mostBooked") === "on",
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    sort_order: Number(value(formData, "sortOrder", 8)) || 0,
    seo_title: value(formData, "seoTitle", 160) || null,
    seo_description: value(formData, "seoDescription", 320) || null,
    social_image_url: socialImageUrl,
    noindex: formData.get("noindex") === "on",
    canonical_url: customCanonicalUrl,
  };

  const result = id
    ? await supabase.from("packages").update(payload).eq("id", id).select("id").single()
    : await supabase.from("packages").insert(payload).select("id").single();
  if (result.error || !result.data) redirect(`${editPath}?error=save`);

  if (currentSlug && currentSlug !== slug) {
    await saveSlugRedirect("package", currentSlug, slug);
    revalidatePath(`/packages/${currentSlug}`);
  }

  revalidatePath("/packages");
  revalidatePath(`/packages/${slug}`);
  revalidatePath("/");
  revalidatePath("/domestic");
  revalidatePath("/international");
  revalidatePath("/honeymoon");
  revalidatePath(`/destinations/${destinationSlug}`);
  if (currentDestinationSlug && currentDestinationSlug !== destinationSlug) {
    revalidatePath(`/destinations/${currentDestinationSlug}`);
  }
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/packages");
  redirect(`/admin/packages/${result.data.id}/edit?saved=1`);
}

export async function setPackagePublished(formData: FormData) {
  await requireAdminUser();
  const id = value(formData, "id", 36);
  const published = formData.get("published") === "true";
  if (!/^[0-9a-f-]{36}$/i.test(id)) redirect("/admin/packages?error=validation");

  const supabase = getSupabaseAdmin();
  if (!supabase) redirect("/admin/packages?error=configuration");
  const { data, error } = await supabase
    .from("packages")
    .update({ published })
    .eq("id", id)
    .select("slug, destination_slug")
    .single();
  if (error || !data) redirect("/admin/packages?error=update");

  revalidatePath("/packages");
  revalidatePath(`/packages/${data.slug}`);
  revalidatePath("/");
  revalidatePath("/domestic");
  revalidatePath("/international");
  revalidatePath("/honeymoon");
  revalidatePath(`/destinations/${data.destination_slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/packages");
  redirect("/admin/packages?updated=1");
}

export async function deletePackage(formData: FormData) {
  await requireAdminUser();
  const id = value(formData, "id", 36);
  if (!/^[0-9a-f-]{36}$/i.test(id)) redirect("/admin/packages?error=validation");

  const supabase = getSupabaseAdmin();
  if (!supabase) redirect("/admin/packages?error=configuration");
  const { data, error } = await supabase
    .from("packages")
    .delete()
    .eq("id", id)
    .select("slug, destination_slug")
    .single();
  if (error || !data) redirect("/admin/packages?error=delete");

  await supabase
    .from("content_redirects")
    .delete()
    .eq("content_type", "package")
    .or(`old_slug.eq.${data.slug},new_slug.eq.${data.slug}`);

  revalidatePath("/packages");
  revalidatePath(`/packages/${data.slug}`);
  revalidatePath(`/destinations/${data.destination_slug}`);
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/packages");
  redirect("/admin/packages?deleted=1");
}

async function destinationImageUrl(
  formData: FormData,
  slug: string,
  currentImageUrl: string | null,
) {
  const image = formData.get("imageFile");
  const manualUrl = value(formData, "imageUrl", 1_000);
  if (!(image instanceof File) || image.size === 0) {
    const candidate = manualUrl || currentImageUrl;
    if (!candidate) return null;
    if (candidate.startsWith("/")) return candidate;
    try {
      const parsed = new URL(candidate);
      return parsed.protocol === "https:" &&
        parsed.hostname.endsWith(".supabase.co") &&
        parsed.pathname.startsWith("/storage/v1/object/public/")
        ? candidate
        : null;
    } catch {
      return null;
    }
  }
  if (image.size > 5 * 1024 * 1024 || !packageImageTypes.has(image.type)) return null;

  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const imageBuffer = Buffer.from(await image.arrayBuffer());
  const metadata = await sharp(imageBuffer).metadata();
  if (!metadata.width || !metadata.height || metadata.width < 1600 || metadata.height < 900) {
    return null;
  }
  const extension =
    image.type === "image/png"
      ? "png"
      : image.type === "image/avif"
        ? "avif"
        : image.type === "image/webp"
          ? "webp"
          : "jpg";
  const objectPath = `${slug}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage
    .from("destination-images")
    .upload(objectPath, imageBuffer, {
      contentType: image.type,
      cacheControl: "31536000",
      upsert: false,
    });
  if (error) return null;
  return supabase.storage.from("destination-images").getPublicUrl(objectPath).data.publicUrl;
}

function revalidateDestinationPages(slug: string) {
  revalidatePath("/");
  revalidatePath("/destinations");
  revalidatePath(`/destinations/${slug}`);
  revalidatePath("/domestic");
  revalidatePath("/international");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/destinations");
}

export async function saveDestination(formData: FormData) {
  await requireAdminUser();
  const supabase = getSupabaseAdmin();
  if (!supabase) redirect("/admin/destinations?error=configuration");

  const id = value(formData, "id", 36);
  const name = value(formData, "name", 160);
  const slug = packageSlug(value(formData, "slug", 160) || name);
  const region = value(formData, "region", 120);
  const scope = value(formData, "scope", 30);
  const blurb = value(formData, "blurb", 600);
  const socialImageUrl = optionalPublicUrl(value(formData, "socialImageUrl", 1_000));
  const customCanonicalUrl = canonicalUrl(value(formData, "canonicalUrl", 1_000));
  const editPath = id ? `/admin/destinations/${id}/edit` : "/admin/destinations/new";

  if (
    !name ||
    !slug ||
    !region ||
    !packageScopes.has(scope) ||
    !blurb ||
    socialImageUrl === undefined ||
    customCanonicalUrl === undefined
  ) {
    redirect(`${editPath}?error=validation`);
  }

  let currentImageUrl: string | null = null;
  let currentSlug: string | null = null;
  if (id) {
    const { data } = await supabase
      .from("destinations")
      .select("image_url, slug")
      .eq("id", id)
      .maybeSingle();
    currentImageUrl = data?.image_url ?? null;
    currentSlug = data?.slug ?? null;
  }
  const imageUrl = await destinationImageUrl(formData, slug, currentImageUrl);
  if (!imageUrl) redirect(`${editPath}?error=image`);

  const payload = {
    slug,
    name,
    region,
    scope,
    image_url: imageUrl,
    image_alt: value(formData, "imageAlt", 240) || `${name} holiday destination`,
    image_position: value(formData, "imagePosition", 80) || "center",
    blurb,
    overview: value(formData, "overview", 2_000) || null,
    ideal_duration: value(formData, "idealDuration", 100) || null,
    best_for: value(formData, "bestFor", 160) || null,
    planning_label: value(formData, "planningLabel", 120) || null,
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    sort_order: Number(value(formData, "sortOrder", 8)) || 0,
    seo_title: value(formData, "seoTitle", 160) || null,
    seo_description: value(formData, "seoDescription", 320) || null,
    social_image_url: socialImageUrl,
    noindex: formData.get("noindex") === "on",
    canonical_url: customCanonicalUrl,
  };

  const result = id
    ? await supabase.from("destinations").update(payload).eq("id", id).select("id").single()
    : await supabase.from("destinations").insert(payload).select("id").single();
  if (result.error || !result.data) redirect(`${editPath}?error=save`);

  if (currentSlug && currentSlug !== slug) {
    await saveSlugRedirect("destination", currentSlug, slug);
    revalidatePath(`/destinations/${currentSlug}`);
  }

  revalidateDestinationPages(slug);
  redirect(`/admin/destinations/${result.data.id}/edit?saved=1`);
}

export async function setDestinationPublished(formData: FormData) {
  await requireAdminUser();
  const id = value(formData, "id", 36);
  const published = formData.get("published") === "true";
  if (!/^[0-9a-f-]{36}$/i.test(id)) redirect("/admin/destinations?error=validation");

  const supabase = getSupabaseAdmin();
  if (!supabase) redirect("/admin/destinations?error=configuration");
  const { data, error } = await supabase
    .from("destinations")
    .update({ published })
    .eq("id", id)
    .select("slug")
    .single();
  if (error || !data) redirect("/admin/destinations?error=update");

  revalidateDestinationPages(data.slug);
  redirect("/admin/destinations?updated=1");
}

export async function deleteDestination(formData: FormData) {
  await requireAdminUser();
  const id = value(formData, "id", 36);
  if (!/^[0-9a-f-]{36}$/i.test(id)) redirect("/admin/destinations?error=validation");

  const supabase = getSupabaseAdmin();
  if (!supabase) redirect("/admin/destinations?error=configuration");
  const { data, error } = await supabase
    .from("destinations")
    .delete()
    .eq("id", id)
    .select("slug")
    .single();
  if (error || !data) redirect("/admin/destinations?error=delete");

  await supabase
    .from("content_redirects")
    .delete()
    .eq("content_type", "destination")
    .or(`old_slug.eq.${data.slug},new_slug.eq.${data.slug}`);

  revalidateDestinationPages(data.slug);
  redirect("/admin/destinations?deleted=1");
}

function promotionDate(formData: FormData, name: string) {
  const raw = value(formData, name, 40);
  if (!raw) return null;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function revalidatePromotionPages() {
  updateTag(promotionCacheTag);
  revalidatePath("/", "layout");
  revalidatePath("/admin/promotions");
}

async function promotionImageUrl(formData: FormData, currentImageUrl: string | null) {
  const image = formData.get("promotionImageFile");
  const manualUrl = value(formData, "imageUrl", 1_000);
  if (!(image instanceof File) || image.size === 0) {
    if (formData.get("removeImage") === "on") return null;
    const candidate = manualUrl || currentImageUrl;
    if (!candidate) return null;
    if (candidate.startsWith("/") && !candidate.startsWith("//")) return candidate;
    try {
      const parsed = new URL(candidate);
      return parsed.protocol === "https:" &&
        parsed.hostname.endsWith(".supabase.co") &&
        parsed.pathname.startsWith("/storage/v1/object/public/")
        ? candidate
        : null;
    } catch {
      return null;
    }
  }
  if (image.size > 5 * 1024 * 1024 || !packageImageTypes.has(image.type)) return null;

  const imageBuffer = Buffer.from(await image.arrayBuffer());
  const metadata = await sharp(imageBuffer).metadata();
  if (!metadata.width || !metadata.height || metadata.width < 900 || metadata.height < 550)
    return null;
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const extension =
    image.type === "image/png"
      ? "png"
      : image.type === "image/avif"
        ? "avif"
        : image.type === "image/webp"
          ? "webp"
          : "jpg";
  const objectPath = `${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage
    .from("promotion-images")
    .upload(objectPath, imageBuffer, {
      contentType: image.type,
      cacheControl: "31536000",
      upsert: false,
    });
  if (error) return null;
  return supabase.storage.from("promotion-images").getPublicUrl(objectPath).data.publicUrl;
}

export async function savePromotion(formData: FormData) {
  await requireAdminUser();
  const supabase = getSupabaseAdmin();
  if (!supabase) redirect("/admin/promotions?error=configuration");

  const id = value(formData, "id", 36);
  const title = value(formData, "title", 120);
  const message = value(formData, "message", 300);
  const placement = value(formData, "placement", 30);
  const theme = value(formData, "theme", 30);
  const startsAt = promotionDate(formData, "startsAt");
  const endsAt = promotionDate(formData, "endsAt");
  const editPath = id ? `/admin/promotions/${id}/edit` : "/admin/promotions/new";
  const rawCtaHref = value(formData, "ctaHref", 500);
  const ctaHref =
    rawCtaHref &&
    ((rawCtaHref.startsWith("/") && !rawCtaHref.startsWith("//")) ||
      rawCtaHref.startsWith("https://"))
      ? rawCtaHref
      : null;

  if (
    !title ||
    !message ||
    !promotionPlacements.has(placement) ||
    !promotionThemes.has(theme) ||
    startsAt === undefined ||
    endsAt === undefined ||
    (startsAt && endsAt && new Date(endsAt) <= new Date(startsAt)) ||
    (rawCtaHref && !ctaHref)
  ) {
    redirect(`${editPath}?error=validation`);
  }

  let currentImageUrl: string | null = null;
  if (id) {
    const { data } = await supabase
      .from("promotions")
      .select("image_url")
      .eq("id", id)
      .maybeSingle();
    currentImageUrl = data?.image_url ?? null;
  }
  const imageFile = formData.get("promotionImageFile");
  const manualImageUrl = value(formData, "imageUrl", 1_000);
  const removingImage = formData.get("removeImage") === "on";
  const imageUrl = await promotionImageUrl(formData, currentImageUrl);
  if (
    !removingImage &&
    ((imageFile instanceof File && imageFile.size > 0) || manualImageUrl) &&
    !imageUrl
  ) {
    redirect(`${editPath}?error=image`);
  }

  const payload = {
    title,
    message,
    offer_text: value(formData, "offerText", 120) || null,
    coupon_code: value(formData, "couponCode", 50).toUpperCase() || null,
    cta_label: value(formData, "ctaLabel", 60) || null,
    cta_href: ctaHref,
    terms_text: value(formData, "termsText", 300) || null,
    image_url: imageUrl,
    image_alt: value(formData, "imageAlt", 240) || (imageUrl ? `${title} promotional offer` : null),
    image_position: value(formData, "imagePosition", 80) || "center",
    placement,
    theme,
    starts_at: startsAt,
    ends_at: endsAt,
    active: formData.get("active") === "on",
    dismissible: formData.get("dismissible") === "on",
    sort_order: Number(value(formData, "sortOrder", 8)) || 0,
  };

  const result = id
    ? await supabase.from("promotions").update(payload).eq("id", id).select("id").single()
    : await supabase.from("promotions").insert(payload).select("id").single();
  if (result.error || !result.data) redirect(`${editPath}?error=save`);

  revalidatePromotionPages();
  redirect(`/admin/promotions/${result.data.id}/edit?saved=1`);
}

export async function setPromotionActive(formData: FormData) {
  await requireAdminUser();
  const id = value(formData, "id", 36);
  const active = formData.get("active") === "true";
  if (!/^[0-9a-f-]{36}$/i.test(id)) redirect("/admin/promotions?error=validation");

  const supabase = getSupabaseAdmin();
  if (!supabase) redirect("/admin/promotions?error=configuration");
  const { error } = await supabase.from("promotions").update({ active }).eq("id", id);
  if (error) redirect("/admin/promotions?error=update");

  revalidatePromotionPages();
  redirect("/admin/promotions?updated=1");
}

export async function deletePromotion(formData: FormData) {
  await requireAdminUser();
  const id = value(formData, "id", 36);
  if (!/^[0-9a-f-]{36}$/i.test(id)) redirect("/admin/promotions?error=validation");

  const supabase = getSupabaseAdmin();
  if (!supabase) redirect("/admin/promotions?error=configuration");
  const { error } = await supabase.from("promotions").delete().eq("id", id);
  if (error) redirect("/admin/promotions?error=delete");

  revalidatePromotionPages();
  redirect("/admin/promotions?deleted=1");
}
