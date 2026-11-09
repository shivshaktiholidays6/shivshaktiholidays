import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "@/lib/supabase/database.types";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabaseUrl =
    process.env["SUPABASE_URL"]?.trim() ?? process.env["NEXT_PUBLIC_SUPABASE_URL"]?.trim();
  const publishableKey =
    process.env["SUPABASE_PUBLISHABLE_KEY"]?.trim() ??
    process.env["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"]?.trim() ??
    process.env["SUPABASE_ANON_KEY"]?.trim();

  if (!supabaseUrl || !publishableKey) return response;

  const supabase = createServerClient<Database>(supabaseUrl, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  await supabase.auth.getClaims();
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
