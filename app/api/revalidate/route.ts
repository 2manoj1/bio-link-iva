import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

const publicTypes = new Set(['creatorProfile','instagramStats','siteContent','pageCopy','mediaKit','market','trustedBrand','premiumExperience','visualStory','shopQuickLink','dailyProductShelf','blogPost','socialVideo']);

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return Response.json({ error:'Revalidation is not configured' }, { status:503 });
  try {
    const { isValidSignature, body } = await parseBody<{_id?:string;_type?:string}>(request, secret);
    if (!isValidSignature) return Response.json({error:'Invalid signature'}, {status:401});
    if (!body?._id || !body._type) return Response.json({error:'Invalid event'}, {status:400});
    if (body._id.startsWith('drafts.') || body._id.startsWith('versions.') || !publicTypes.has(body._type)) {
      return Response.json({revalidated:false});
    }
    revalidateTag('sanity-content', { expire:0 });
    revalidatePath('/', 'layout');
    for (const path of ['/llms.txt','/sitemap.xml','/robots.txt','/opengraph-image']) revalidatePath(path);
    return Response.json({revalidated:true});
  } catch {
    return Response.json({error:'Invalid webhook request'}, {status:400});
  }
}
