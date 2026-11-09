# Supabase enquiry storage

This project saves website enquiries through the server-only `POST /api/enquiries` endpoint. The
browser never receives the Supabase service-role key and cannot access the `enquiries` table
directly.

## One-time setup

1. Create a Supabase project.
2. Open the Supabase SQL Editor and run
   `migrations/202611090001_create_enquiries.sql`.
3. In the project API settings, copy the Project URL and service-role secret into the local `.env`:

   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SECRET_KEY=sb_secret_your-secret-key
   SUPABASE_PUBLISHABLE_KEY=sb_publishable_your-publishable-key
   ADMIN_EMAILS=admin@example.com
   ```

4. Add the same two variables to the production hosting environment and redeploy.
5. Submit a test enquiry and confirm it appears in **Table Editor → enquiries**.

Never prefix the secret-key variable with `NEXT_PUBLIC_` and never commit the real key. The legacy
`SUPABASE_SERVICE_ROLE_KEY` variable is also supported, but new projects should use the secret key.
Row Level Security is enabled and browser roles receive no table permissions.

## Admin dashboard setup

1. In Supabase, open **Authentication → Users** and create the administrator user with an email
   address and a strong password.
2. Put the same email address in `ADMIN_EMAILS`. Separate multiple approved administrators with
   commas.
3. Copy the `sb_publishable_...` key from **Project Settings → API Keys** into
   `SUPABASE_PUBLISHABLE_KEY`.
4. Restart the Next.js server and open `/admin/login`.

Authentication verifies the Supabase session and the server checks the email allowlist for every
dashboard page and status update. The publishable key can identify the Auth project but cannot read
the `enquiries` table; enquiry access remains server-only.
