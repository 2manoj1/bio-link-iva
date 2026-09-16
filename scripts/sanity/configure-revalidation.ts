import { getCliClient } from 'sanity/cli';
import { config } from 'dotenv';
config({path:'.env.local',quiet:true});
async function main() {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) throw new Error('Missing SANITY_REVALIDATE_SECRET');
  const client = getCliClient({apiVersion:'2024-01-01'});
  const project = client.config().projectId!;
  const uri = `/hooks/projects/${project}`;
  const hooks = await client.request<{id:string;name:string;url:string}[]>({uri});
  const name = 'Website published content revalidation';
  const existing = hooks.find(hook => hook.name === name);
  if (existing) { console.log('Webhook exists:',existing.id,existing.url); return; }
  const hook = await client.request<{id:string}>({uri,method:'POST',body:{
    type:'document',name,url:'https://iva.manojmukherjee.co.in/api/revalidate',dataset:'production',
    rule:{on:['create','update','delete'],filter:'_type in ["creatorProfile","instagramStats","siteContent","pageCopy","mediaKit","market","trustedBrand","premiumExperience","visualStory","shopQuickLink","dailyProductShelf","blogPost","socialVideo"]',projection:'{_id,_type}'},
    apiVersion:'v2021-03-25',httpMethod:'POST',includeDrafts:false,includeAllVersions:false,secret,isDisabledByUser:false,
  }});
  console.log('Created published-only signed webhook:',hook.id);
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
