# CMS operations

## Editing

Open `/studio` (or `/admin`, which redirects there). Sign in with a Sanity project member account. Sanity controls editor permissions; Clerk is no longer used.

The CMS manages site identity/contact/navigation, page copy, SEO overrides, profile, manually maintained Instagram stats, media kit, city guides, products, brands, blog articles, and social videos. Theme/layout/schema changes require a deployment. Counts do not automatically sync from Instagram.

Publish to make changes public. Public queries use the published perspective and a 60-second Next.js cache. After the cache expires, a request triggers background refresh; a subsequent reload shows the result. Future-dated posts/videos are eligible only after their date. Cleared collections stay empty. On CMS errors, shared content falls back to bundled defaults; optional blog/video collections can be empty on a cold cache. Cached responses can remain available during temporary CMS failures.

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
- `pnpm cms:profile` previews the supplied profile snapshot; `--apply` updates it with revision/draft guards.
- `pnpm exec sanity exec scripts/sanity/repair-product-keys.ts --with-user-token` previews missing product-array keys; append `-- --apply` to repair them with revision guards.

## Production configuration

See `.env.example`. The public website needs the Sanity project/dataset settings but no CMS token. Production CORS must allow the exact Studio origin with credentials. Avoid wildcard credentialed origins.

AI generation requires a Google key and a shared Upstash quota store. Vercel supplies `KV_REST_API_URL` and `KV_REST_API_TOKEN`; standalone `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` also work. The atomic daily/burst quota is shared across instances. If Redis is unavailable, paid generation is disabled and template/contact answers remain available.

AI answer caching is best-effort per instance; content revisions are included in answer keys. The cache maintenance endpoint requires `IVA_CHAT_CACHE_SECRET` and does not flush other instances.
