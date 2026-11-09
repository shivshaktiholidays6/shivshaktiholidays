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

## Dynamic package management

Run `migrations/202611090002_create_packages.sql` once in the Supabase SQL Editor. It creates the
`packages` table and a public `package-images` Storage bucket with a 5 MB image limit.

After running the migration, open `/admin/packages` to:

- create and edit packages;
- upload package images;
- manage prices, durations, categories, highlights and itineraries;
- control featured, most-booked and published states;
- edit SEO titles and descriptions.

Database packages replace catalogue packages with the same slug. Catalogue packages that have not
been migrated continue to appear, so content can be transferred gradually without empty pages.

## Dynamic destination management

Run `migrations/202611090003_create_destinations.sql` once in the Supabase SQL Editor after the
package migration. It creates the `destinations` table and a public `destination-images` Storage
bucket with a 5 MB image limit.

After running the migration, open `/admin/destinations` to:

- create, edit and safely delete destinations;
- upload high-resolution destination images;
- manage regions, page descriptions and trip-planning details;
- feature destinations on the homepage;
- publish destinations or keep them as drafts;
- control display order and destination SEO.

Published database destinations replace catalogue destinations with the same slug. A draft override
hides its matching catalogue destination, allowing the website content to be migrated gradually.

## Offers and promotional banners

Run `migrations/202611090004_create_promotions.sql` once in the Supabase SQL Editor. Then open
`/admin/promotions` to create reusable Diwali, holiday-season and limited-time campaigns.

Each banner can include an offer badge, coupon code, call-to-action link and terms note. It can be
scheduled, displayed sitewide or only on the homepage, styled with one of the available themes and
made dismissible for visitors. Only active banners inside their configured date range appear.

If the promotions table was created before image cards were added, also run
`migrations/202611090005_add_promotion_images.sql`. An offer with an image appears as a compact
floating card; an offer without an image continues to use the slim header banner.
