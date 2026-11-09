export type EnquiryType = "general" | "package" | "popup" | "plan_trip";

export interface EnquirySubmission {
  type: EnquiryType;
  source: string;
  name: string;
  phone: string;
  email: string;
  consent: boolean;
  company?: string | undefined;
  destination?: string | undefined;
  destinationSlug?: string | undefined;
  departureCity?: string | undefined;
  packageName?: string | undefined;
  packageSlug?: string | undefined;
  travelStart?: string | undefined;
  travelEnd?: string | undefined;
  travellers?: number | undefined;
  adults?: number | undefined;
  children?: number | undefined;
  infants?: number | undefined;
  days?: number | undefined;
  preferences?: string[] | undefined;
  budget?: string | undefined;
  message?: string | undefined;
  metadata?: Record<string, string | number | boolean | string[] | undefined> | undefined;
}

interface SavedEnquiry {
  enquiryCode: string;
}

export class EnquirySubmissionError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "EnquirySubmissionError";
  }
}

function campaignContext() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    pagePath: window.location.pathname,
    utmSource: params.get("utm_source") ?? undefined,
    utmMedium: params.get("utm_medium") ?? undefined,
    utmCampaign: params.get("utm_campaign") ?? undefined,
  };
}

export async function saveEnquiry(submission: EnquirySubmission): Promise<SavedEnquiry> {
  const response = await fetch("/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...submission, ...campaignContext() }),
  });

  const result = (await response.json().catch(() => null)) as
    | { enquiryCode?: string; message?: string }
    | null;

  if (!response.ok || !result?.enquiryCode) {
    throw new EnquirySubmissionError(
      result?.message ?? "We could not save your enquiry. Please try again.",
      response.status,
    );
  }

  return { enquiryCode: result.enquiryCode };
}
