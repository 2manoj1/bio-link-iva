# CMS operations

## Editing

Open `/studio` (or `/admin`, which redirects there). Sign in with a Sanity project member account. Sanity controls editor permissions; Clerk is no longer used.

The CMS manages creator identity, contact details, navigation, page copy, page SEO, editor-managed social metrics, media kit, city guides, products, brands, blog articles, and social videos. Theme/layout/schema changes require a deployment. Counts do not automatically sync from Instagram.

Publish to make changes public. The signed Sanity webhook clears the shared `sanity-content` cache and dependent pages, metadata, JSON-LD, `/llms.txt`, sitemap, robots and social images. Public queries use the published perspective; drafts are excluded. A 60-second cache lifetime is a fallback if the webhook is delayed: a request triggers background refresh after expiry, and a subsequent reload shows the result. Future-dated posts/videos are eligible only after their date. Cleared collections stay empty. On CMS errors, layout content can fall back to bundled defaults; optional collections can be empty on a cold cache. Creator identity and social metrics do not fall back to hardcoded facts. Without cached identity, the public page shows a retry screen and `/llms.txt` returns 503. Cached responses can remain available during temporary CMS failures.

The WhatsApp form opens a prefilled conversation. The visitor must send it in WhatsApp. The website does not retain inquiries or send email.

## Validation

- `pnpm cms:validate` validates actual dataset documents against every Studio schema. Run `pnpm exec sanity login` with a project member account first.
- `pnpm cms:validate-seed` checks the legacy seed fixtures only.
- `pnpm check` runs lint, regression tests, and the production build.
- `pnpm check:production .env.production.audit` checks an explicitly pulled production environment file without printing values.

## Backups and recovery

Run `pnpm cms:backup` before migrations and regularly after editing. This exports the configured dataset, including drafts and available Sanity assets, to a timestamped archive in gitignored `backups/`. External URLs and `/public` images are not Sanity assets; keep the repository and its public files backed up too. Copy archives to encrypted off-machine storage. Automated off-machine backup storage is not configured by this repository.

Check an archive without changing content:

```sh
pnpm exec sanity documents validate --file backups/your-backup.tar.gz --yes
```

Rehearse restoration in a separate dataset, never the production dataset:

```sh
pnpm exec sanity dataset create restore-check --visibility private
# Verify the actual visibility first: some plans fall back to public.
# Never import an archive containing drafts/private data into a public dataset.
pnpm exec sanity dataset import backups/your-backup.tar.gz --dataset restore-check
pnpm exec sanity documents validate --dataset restore-check --yes
```

Compare restored document IDs and content. Import generates missing object-array keys; revision IDs/timestamps can differ. Delete only the temporary restore dataset when finished. Production replacement is a separate recovery operation and requires checking revisions, taking a fresh backup, and reviewing the target dataset before importing with `--replace`.

## Seeding and migration

Normal editing needs no server write token. Legacy migration/seed tools require a valid server-only `SANITY_WRITE_TOKEN` locally. Do not add it to the deployed website or commit it.

- `pnpm cms:seed -- --dry-run` previews the legacy create-only seed.
- `pnpm cms:seed -- --confirm-production` creates missing legacy records; it does not overwrite edits.
- `pnpm cms:profile` is an archival snapshot importer, not the normal metrics workflow. Do not apply old snapshots to current published metrics. Edit Social metrics in Studio instead.
- `pnpm exec sanity exec scripts/sanity/repair-product-keys.ts --with-user-token` previews missing product-array keys; append `-- --apply` to repair them with revision guards.

## Production configuration

See `.env.example`. The public website needs the Sanity project/dataset settings but no CMS token. Production CORS must allow the exact Studio origin with credentials. Avoid wildcard credentialed origins.

AI generation requires a Google key and a shared Upstash quota store. Vercel supplies `KV_REST_API_URL` and `KV_REST_API_TOKEN`; standalone `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` also work. The atomic daily/burst quota is shared across instances. If Redis is unavailable, paid generation is disabled and template/contact answers remain available.

AI answer caching is best-effort per instance; content revisions are included in answer keys. The cache maintenance endpoint requires `IVA_CHAT_CACHE_SECRET` and does not flush other instances.

## Update once, publish everywhere

| To update | Open in Sanity Studio |
| --- | --- |
| Name, biography, title, location, contact details, profile image or official social links | **Creator identity & profiles** |
| Content categories, services and collaboration industries | **Creator identity & profiles** |
| Primary/additional markets | **Creator identity & profiles** → market references; edit the linked market for its description |
| Followers, posts, views, YouTube subscribers | **Social metrics**; also set **Metrics last confirmed** |
| Brand collaborations | **Trusted brands**; hidden entries stay out of public lists |
| Article or other page-specific SEO | The article, or **Site settings → SEO** |

Click **Publish**, then reload the relevant page and `/llms.txt`. Do not edit a text file or redeploy for content changes. Homepage/About search descriptions and entity identity intentionally come from the creator profile. Keep “Soft luxury, through Iva’s eyes.” in the existing page copy. Counts remain editor-managed; there is no Instagram scraping.

The production webhook posts to `/api/revalidate`, uses `SANITY_REVALIDATE_SECRET`, excludes drafts/version documents, and sends only `_id`/`_type`. To provision it on a fresh project, set the same server-only secret locally and on the deployment, then run `pnpm exec sanity exec scripts/sanity/configure-revalidation.ts --with-user-token`. The command preserves an existing hook; secret rotation must update both sides together. Never paste or commit the secret.
