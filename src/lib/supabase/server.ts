import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/supabase/database.types";

export async function getSupabaseServerClient() {
  const supabaseUrl =
    process.env["SUPABASE_URL"]?.trim() ?? process.env["NEXT_PUBLIC_SUPABASE_URL"]?.trim();
  const publishableKey =
    process.env["SUPABASE_PUBLISHABLE_KEY"]?.trim() ??
    process.env["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"]?.trim() ??
    process.env["SUPABASE_ANON_KEY"]?.trim();

  if (!supabaseUrl || !publishableKey) return null;

  const cookieStore = await cookies();
  return createServerClient<Database>(supabaseUrl, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Server Components cannot always write cookies. Login/logout Server Actions can.
        }
      },
    },
  });
}
