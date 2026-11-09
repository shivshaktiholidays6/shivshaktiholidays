import { NextResponse } from "next/server";
import { getActivePromotion } from "@/lib/promotions";

export const dynamic = "force-dynamic";

export async function GET() {
  const promotion = await getActivePromotion();
  return NextResponse.json(
    { promotion },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
