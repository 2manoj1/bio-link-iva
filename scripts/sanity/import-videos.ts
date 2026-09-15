import { writeClient } from './utils/client';
async function main() {
  const experiences = await writeClient.fetch<{title:string;link:string;image:string;views:string}[]>(
    '*[_type=="premiumExperience" && link match "*instagram.com/reel/*" && !(_id in path("drafts.**"))]{title,link,image,views}'
  );
  const existing = await writeClient.fetch<string[]>('*[_type=="socialVideo"].url');
  const missing=experiences.filter(item=>!existing.includes(item.link));
  console.log('Existing reel links to add:',missing.map(item=>item.title));
  if(!process.argv.includes('--apply'))return;
  for(const [order,item] of missing.entries()) await writeClient.create({
    _type:'socialVideo',title:item.title,url:item.link,image:item.image,views:item.views,
    platform:'Instagram',popular:true,order,hidden:false,publishedAt:new Date().toISOString(),
  });
  await writeClient.patch('singleton-page-copy').setIfMissing({'SocialVideos.play_here':'Play here'}).commit();
}
main().catch(error=>{console.error(error);process.exitCode=1});
