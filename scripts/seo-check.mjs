const baseUrl = (process.env.SEO_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const expectIndexing = process.env.EXPECT_INDEXING === "true";
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

async function request(path) {
  const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
  return { response, text: await response.text() };
}

function metaContent(html, name, attribute = "name") {
  const tags = html.match(/<meta\s+[^>]*>/gi) || [];
  const tag = tags.find((item) => new RegExp(`${attribute}=["']${name}["']`, "i").test(item));
  return tag?.match(/content=["']([^"']*)["']/i)?.[1] || "";
}

function linkHref(html, rel) {
  const tags = html.match(/<link\s+[^>]*>/gi) || [];
  const tag = tags.find((item) => new RegExp(`rel=["']${rel}["']`, "i").test(item));
  return tag?.match(/href=["']([^"']*)["']/i)?.[1] || "";
}

function validateHtml(path, html) {
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() || "";
  const description = metaContent(html, "description");
  const canonical = linkHref(html, "canonical");
  const robots = metaContent(html, "robots");
  const h1Count = (html.match(/<h1\b/gi) || []).length;

  check(Boolean(title), `${path}: missing title`);
  check(Boolean(description), `${path}: missing meta description`);
  check(canonical.startsWith("https://shivshaktiholidays.com"), `${path}: invalid canonical`);
  check(Boolean(metaContent(html, "og:title", "property")), `${path}: missing og:title`);
  check(Boolean(metaContent(html, "og:image", "property")), `${path}: missing og:image`);
  check(h1Count === 1, `${path}: expected one h1, found ${h1Count}`);
  if (expectIndexing) check(!/noindex/i.test(robots), `${path}: unexpectedly noindex`);
  else check(/noindex/i.test(robots), `${path}: preview page is missing noindex`);

  for (const match of html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      JSON.parse(match[1]);
    } catch {
      failures.push(`${path}: invalid JSON-LD`);
    }
  }
}

const robots = await request("/robots.txt");
check(robots.response.status === 200, "robots.txt did not return 200");
check(
  robots.text.includes("Sitemap: https://shivshaktiholidays.com/sitemap.xml"),
  "robots.txt sitemap is missing",
);
check(
  expectIndexing ? !robots.text.includes("Disallow: /\n") : robots.text.includes("Disallow: /"),
  "robots.txt indexing mode does not match EXPECT_INDEXING",
);

const sitemap = await request("/sitemap.xml");
check(sitemap.response.status === 200, "sitemap.xml did not return 200");
check(sitemap.text.includes("https://shivshaktiholidays.com"), "sitemap uses the wrong domain");
check(!sitemap.text.includes("/admin"), "sitemap contains an admin URL");
check(!sitemap.text.includes("/api/"), "sitemap contains an API URL");

const sitemapPaths = [
  ...sitemap.text.matchAll(/<loc>https:\/\/shivshaktiholidays\.com([^<]*)<\/loc>/g),
].map((match) => match[1] || "/");
const samplePackage = sitemapPaths.find((path) => path.startsWith("/packages/"));
const sampleDestination = sitemapPaths.find((path) => path.startsWith("/destinations/"));
const paths = ["/", "/packages", "/destinations", "/contact"];
if (samplePackage) paths.push(samplePackage);
if (sampleDestination) paths.push(sampleDestination);

for (const path of paths) {
  const page = await request(path);
  check(page.response.status === 200, `${path}: expected 200, received ${page.response.status}`);
  if (page.response.status === 200) validateHtml(path, page.text);
}

const missing = await request("/this-page-must-not-exist-seo-check");
check(missing.response.status === 404, `missing page returned ${missing.response.status}, not 404`);

if (failures.length) {
  console.error(`SEO checks failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `SEO checks passed for ${paths.length} public pages, robots.txt, sitemap.xml and 404 handling.`,
);
