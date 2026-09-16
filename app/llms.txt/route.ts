import { getCreatorIdentity } from '@/lib/creator-identity';
import { getSocialMetrics } from '@/lib/social-metrics';
import { getTrustedBrands } from '@/lib/brand-data-fetch';
import { getPublicPages } from '@/lib/public-pages';
import { renderLlmsText } from '@/lib/creator-discovery';
import { unstable_rethrow } from 'next/navigation';

// Generate on request while sharing the tagged Sanity data cache with the site.
export async function GET() {
  try {
    const [profile, metrics, pages, brands] = await Promise.all([getCreatorIdentity(), getSocialMetrics(), getPublicPages(), getTrustedBrands()]);
    return new Response(renderLlmsText(profile, metrics, pages, brands), {
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' },
    });
  } catch (error) {
    unstable_rethrow(error);
    return new Response('Creator information is temporarily unavailable. Please try again shortly.\n', {
      status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'Retry-After': '60' },
    });
  }
}
