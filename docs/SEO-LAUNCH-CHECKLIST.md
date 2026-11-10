# Shiv Shakti Holidays SEO launch checklist

This checklist separates safe pre-launch code from work that requires the live domain or an owner account. SEO improvements cannot guarantee rankings, indexing, rich results, or AI citations.

## Before launch

- [ ] Run `supabase/migrations/202611100001_add_content_seo_controls.sql` once in the Supabase SQL Editor.
- [ ] Test adding, editing, publishing, unpublishing, changing the slug of, and deleting a temporary package and destination.
- [ ] Confirm the business name, address, email and both telephone numbers in `src/config/site.ts`.
- [ ] Confirm every published package and destination has original, useful content and accurate image alt text.
- [ ] Replace the sample testimonial content with genuine, customer-approved reviews when available; do not add review schema until the source is verified.
- [ ] Set `SITE_ENVIRONMENT=production` and `ALLOW_SEARCH_INDEXING=true` only on the real production deployment.
- [ ] Keep `SITE_ENVIRONMENT=preview` and `ALLOW_SEARCH_INDEXING=false` on preview and staging deployments.
- [ ] Set `NEXT_PUBLIC_GA_ID` on production and confirm the consent banner works.
- [ ] Add the Google and Bing verification values only after the services provide them.
- [ ] Run `npm run build`.
- [ ] Start the production build locally with `npm run start`.
- [ ] Run `npm run seo:check`. Use `EXPECT_INDEXING=true` only when testing a production-configured build.
- [ ] Confirm the hosting platform redirects HTTP to HTTPS and `www.shivshaktiholidays.com` to `shivshaktiholidays.com` in one hop.
- [ ] Confirm enquiry, WhatsApp, telephone and plan-trip flows still work.

## Manual owner action required after launch

### Google Search Console

1. Add the Domain property `shivshaktiholidays.com`.
2. Verify it with the DNS TXT record supplied by Google.
3. Submit `https://shivshaktiholidays.com/sitemap.xml`.
4. Inspect the homepage, one package and one destination URL.
5. Monitor Page indexing, Core Web Vitals, HTTPS and Manual actions reports.

### Bing Webmaster Tools

1. Add `https://shivshaktiholidays.com` or import the verified Search Console property.
2. Complete verification.
3. Submit `https://shivshaktiholidays.com/sitemap.xml`.
4. Use URL Inspection for the homepage and important package pages.
5. Consider IndexNow only after a Bing account and key are available. Never submit drafts, redirects or noncanonical URLs.

### Google Business Profile

- Use the exact name `Shiv Shakti Holidays`; do not create a duplicate profile.
- Choose the most accurate primary travel-agency category.
- Confirm the genuine Roorkee address, map pin, telephone numbers, website and business hours.
- Add accurate services and an original business description.
- Upload genuine logo, office, team and travel-service photos.
- Request genuine reviews from real customers without incentives or fabricated text.
- Keep name, address and telephone information consistent with the website.

### Analytics verification

- Accept analytics in a test browser and check GA4 Realtime.
- Verify `page_view`, `package_view`, `destination_view`, `whatsapp_click`, `phone_click`, `lead_form_submit` and `plan_trip_submit`.
- Mark only genuine conversion actions as GA4 key events.
- Confirm no name, email, telephone number or enquiry message appears in analytics.

### Local citations and backlinks

- Create or update accurate listings on Bing Places, Apple Business Connect, Justdial and relevant established local directories.
- Pursue genuine partnerships with hotels, transport providers, tourism businesses and relevant travel publications.
- Keep the same official business information everywhere.
- Do not buy link packages, create fake locations, automate spam listings or purchase reviews.

## Production verification required

- [ ] `https://shivshaktiholidays.com/robots.txt` allows approved public pages.
- [ ] `https://shivshaktiholidays.com/sitemap.xml` contains only canonical, published, indexable URLs.
- [ ] Page source contains server-rendered titles, descriptions, canonicals and JSON-LD.
- [ ] Nonexistent URLs return HTTP 404; old saved slugs return HTTP 308 to the new URL.
- [ ] Preview deployments return `X-Robots-Tag: noindex, nofollow, noarchive`.
- [ ] Google Rich Results Test and Schema Markup Validator report no applicable errors.
- [ ] Facebook Sharing Debugger and an X card preview show accessible images.
- [ ] PageSpeed Insights is run on the homepage, a package and a destination on mobile and desktop.
- [ ] Search Console and Bing report successful sitemap processing.
