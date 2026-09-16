# Sanity → website → discovery synchronization

Completed and deployed on 16 September 2026. Production: https://iva.manojmukherjee.co.in

## 1. Architecture audit

The site uses Next.js 16.3.0 App Router, Sanity Studio 6.9.2 and next-sanity 13.3.2. Creator identity was split across the profile, Site settings and static metadata. Social metrics were already published in the Instagram statistics singleton. `/llms.txt` was a static file.

The final flow is **published Sanity profile + social metrics + public content → shared cached reads → website, SEO, JSON-LD and dynamic `/llms.txt`**. Layout, typography, animation, colors and the existing “Soft luxury, through Iva’s eyes.” positioning are preserved.

## 2. Sanity changes

Extended `singleton-creator-profile` with canonical name, professional title, biographies, contact details, images, verified social URLs, referenced markets, industries and services. Existing profile fields remain. Removed duplicate creator/industry fields from Site settings and the services list from Media Kit. Migrated existing values with revision guards after a dataset backup.

Extended `singleton-instagram-stats` with YouTube subscribers, most-loved reel views and `metricsUpdatedAt`; the Studio label is **Social metrics**. Preserved the published values: **80K followers, 875 posts, 1,750 following, 3M recent views, 16K+ YouTube subscribers and 319K most-loved reel views**. These are CMS assertions, not independently verified platform measurements. The timestamp preserves the source record's previous update time. Future confirmations are editor-managed.

A final published biography edit clarified “Bangalore digital creator” to “Bengaluru (Bangalore)-based digital creator”; this used a revision guard and demonstrated live propagation.

## 3. `/llms.txt`

`app/llms.txt/route.ts` generates UTF-8 `text/plain` from explicit published GROQ projections. The static file was removed. Output includes identity, professional profile, location, categories, markets, official social links, timestamped metrics, services, existing brand collaborations, public pages and concise FAQs. Brands are described as listed on the website, without inventing independent verification.

No hardcoded fallback follower/post counts are emitted. Missing metrics are omitted; missing uncached identity returns 503 with retry guidance. No write token, draft, internal credential or raw CMS dump is exposed.

## 4. SEO

Homepage title, creator authorship, canonical URL, social metadata and homepage/About descriptions derive from the canonical profile. Existing page-specific CMS SEO remains available. Blog metadata preserves article type, publication time and article imagery. Social-image identity and profile imagery now use CMS data. Removed the incorrect assumption that the Instagram handle was also a Twitter identity.

## 5. AEO

The existing About page shows the canonical biography and a short five-question FAQ covering identity, location, content, markets and collaboration. The same facts generate the FAQ in `/llms.txt`. No new landing pages or content strategy were introduced.

## 6. GEO

Shared identity, location, categories, services and verified existing social links connect the public outputs to one creator entity. Bengaluru and Bangalore occur naturally in the biography and location. This improves factual consistency; it does not promise search or AI rankings.

## 7. Structured data

- **Person:** canonical name, description, job title, profile image, official social `sameAs`, content categories and location.
- **WebSite:** stable entity ID and the Person publisher.
- **WebPage:** homepage linked to the same Person and WebSite.
- **FAQPage:** only the questions and answers visibly rendered on About.
- **BlogPosting / BreadcrumbList:** article URLs and authors link to the canonical identity; removed an invented organization publisher and false modified date.

JSON-LD remains safely serialized to prevent CMS text from closing its script element.

## 8. Revalidation

An enabled Sanity document webhook posts signed published-content events to `/api/revalidate`. It excludes drafts and version documents and sends only document ID/type. The server validates the signature using a server-only `SANITY_REVALIDATE_SECRET`, expires the shared `sanity-content` tag, and invalidates dependent pages plus discovery endpoints/social imagery.

A 60-second data-cache lifetime provides fallback refresh if webhook delivery is delayed. This is request-driven background refresh, not a guarantee that every CDN response changes at exactly 60 seconds. Browsers already open on a page need a reload. No Instagram scraping was added.

Webhook implementation follows [Sanity’s Webhooks API reference](https://www.sanity.io/docs/http-reference/webhooks).

## 9. Exact repository files changed for this sync

- `.env.example`
- `app/(public)/bengaluru-guide/[area]/page.tsx`
- `app/(public)/blog/[slug]/page.tsx`
- `app/(public)/layout.tsx`
- `app/(public)/page.tsx`
- `app/apple-icon.tsx`
- `app/layout.tsx`
- `app/opengraph-image.tsx`
- `app/robots.ts`
- `app/sitemap.ts`
- `components/site/blog.tsx`
- `components/site/content-provider.tsx`
- `components/site/page-sections.tsx`
- `lib/ai/iva-context-tool.ts`
- `lib/brand-data-fetch.ts`
- `lib/brand-data.ts`
- `lib/page-metadata.ts`
- `lib/site-content-defaults.ts`
- `lib/site-content.ts`
- `public/llms.txt` (removed)
- `sanity/schemaTypes/creatorProfileType.ts`
- `sanity/schemaTypes/instagramStatsType.ts`
- `sanity/schemaTypes/mediaKitType.ts`
- `sanity/schemaTypes/siteContentType.ts`
- `sanity/structure.ts`
- `scripts/check-production-env.ts`
- `scripts/sanity/README.md`
- `scripts/sanity/migrate-content.ts`
- `app/api/revalidate/route.ts`
- `app/global-error.tsx`
- `app/llms.txt/route.ts`
- `components/site/creator-faq.tsx`
- `lib/creator-discovery.ts`
- `lib/creator-identity.ts`
- `lib/public-pages.ts`
- `lib/social-metrics.ts`
- `scripts/sanity/configure-revalidation.ts`
- `scripts/sanity/consolidate-identity.ts`
- `tests/creator-discovery.test.ts`
- `docs/cms-discovery-sync.md` (this report)

## 10. Validation

- `pnpm check`: lint, **10 tests**, and production build passed.
- `pnpm typecheck`: passed.
- `pnpm cms:validate`: **78 documents valid, zero errors/warnings**.
- Production deployment `dpl_87yLF2Z6kbPmyjRpkcVLW7XsrUgJ`: READY and aliased to the canonical domain.
- Live `/llms.txt`: **200, text/plain; every listed metric matches the current published singleton**.
- Homepage and About: canonical URLs and parsed JSON-LD agree with the published biography/social identity.
- Homepage and Media Kit: follower/post values agree with `/llms.txt`.
- Live sitemap: **26 URLs, all HTTP 200**, no private/admin/API entries.
- Robots: public routes and `/llms.txt` allowed; sitemap uses the canonical origin.
- Live social image and Apple icon: HTTP 200, image/png.
- `/admin`: redirects to `/studio`; Studio loads with Sanity authentication.
- Unsigned revalidation and unauthorized chat-cache maintenance: HTTP 401.
- Real published biography change: Sanity delivery completed **200**, body `{"revalidated":true}`, duration **3609 ms**. Subsequent live checks confirmed the new text in homepage metadata, Person/WebPage data, About, FAQ and `/llms.txt`, without another deployment.
- Browser checked the existing design and FAQ; homepage/About loaded without browser errors or horizontal overflow.
- Live chat returned HTTP 200 and correctly answered with 80K followers and 875 posts from the CMS.

Backups remain in the gitignored `backups/` directory. The latest pre-publish archive is `production-2026-09-16T07-57-22-316Z.tar.gz`. Automated off-machine backups are not configured; the existing operations guide explains exports and recovery.

## 11. Iva’s editor workflow

1. Open [Sanity Studio](https://iva.manojmukherjee.co.in/studio) and sign in.
2. For name, biography, location, social links, contact details, services or categories, edit **Creator identity & profiles**.
3. For follower/post/view/subscriber counts, edit **Social metrics** and update **Metrics last confirmed**.
4. For brand collaborations, edit the brand records; for city descriptions, edit the linked market.
5. Click **Publish**, then reload the page or [llms.txt](https://iva.manojmukherjee.co.in/llms.txt). No code edit or deployment is needed.

The inquiry form continues to open WhatsApp; it does not store submissions. Details and recovery steps are in `scripts/sanity/README.md`.
