import { NextResponse } from "next/server";
import { getFreshActivePromotion } from "@/lib/promotions";

export const dynamic = "force-dynamic";

export async function GET() {
  const promotion = await getFreshActivePromotion();
  return NextResponse.json({ promotion }, { headers: { "Cache-Control": "no-store, max-age=0" } });
}
