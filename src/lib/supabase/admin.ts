import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

let adminClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseAdmin() {
  const supabaseUrl =
    process.env["SUPABASE_URL"]?.trim() ?? process.env["NEXT_PUBLIC_SUPABASE_URL"]?.trim();
  const secretKey =
    process.env["SUPABASE_SECRET_KEY"]?.trim() ??
    process.env["SUPABASE_SERVICE_ROLE_KEY"]?.trim();

  if (!supabaseUrl || !secretKey) return null;

  adminClient ??= createClient<Database>(supabaseUrl, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return adminClient;
}
