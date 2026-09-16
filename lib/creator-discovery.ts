import type { CreatorIdentity } from './creator-identity';
import type { SocialMetrics } from './social-metrics';

export function canonicalUrl(profile: Pick<CreatorIdentity, 'websiteUrl'>, path = '/') {
  return new URL(path, `${profile.websiteUrl}/`).href;
}

export function verifiedSocialProfiles(profile: CreatorIdentity) {
  return [...new Set([profile.instagramUrl, profile.youtubeUrl, profile.facebookPageUrl].filter(url => /^https:\/\//.test(url)))];
}

export function creatorFaqs(profile: CreatorIdentity) {
  const markets = [profile.primaryMarket, ...profile.additionalMarkets].filter(item => item !== null);
  return [
    { question: `Who is ${profile.name}?`, answer: profile.description },
    { question: `Where is ${profile.name} based?`, answer: `${profile.name} is based in ${profile.location}.` },
    { question: 'What content does she create?', answer: `${profile.name} covers ${profile.contentPillars.join(', ')}. ${profile.positioning}` },
    { question: 'Which markets does she cover?', answer: markets.map(item => `${item!.name}: ${item!.positioning}`).join(' ') },
    { question: 'How can brands collaborate?', answer: `${profile.collaborationCta}. Contact ${profile.email} or use the collaboration inquiry form. ${profile.services.map(service => service.title).join(', ')}.` },
  ].filter(item => item.answer.trim());
}

export function creatorStructuredData(profile: CreatorIdentity) {
  const url = canonicalUrl(profile);
  return [
    {
      '@context': 'https://schema.org', '@type': 'Person', '@id': `${url}#person`,
      name: profile.name, alternateName: profile.handle, jobTitle: `${profile.title}${profile.category ? ` / ${profile.category}` : ''}`,
      description: profile.description, url, image: new URL(profile.profileImage, url).href,
      sameAs: verifiedSocialProfiles(profile), knowsAbout: profile.contentPillars,
      homeLocation: { '@type': 'Place', name: profile.location },
    },
    {
      '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${url}#website`,
      name: profile.name, description: profile.description, url,
      publisher: { '@id': `${url}#person` },
    },
  ];
}

const line = (value: string) => value.replace(/[\r\n\u0000-\u001f]+/g, ' ').trim();
export function renderLlmsText(profile: CreatorIdentity, metrics: SocialMetrics | null, pages: {path:string;title:string}[], brands: {name:string;focus?:string}[]) {
  const sections = [
    `# ${line(profile.name)}\n\n> ${line(profile.description)}`,
    `## Identity\n\n- Name: ${line(profile.name)}\n- Official website: ${canonicalUrl(profile)}\n- Instagram handle: ${line(profile.handle)}`,
    `## Professional Profile\n\n${line(profile.title)}${profile.category ? ` / ${line(profile.category)}` : ''}\n\n${line(profile.longDescription || profile.positioning)}`,
    `## Location\n\n${line(profile.location)}`,
    `## Content Categories\n\n${profile.contentPillars.map(value=>`- ${line(value)}`).join('\n')}`,
    `## Markets\n\n${[profile.primaryMarket,...profile.additionalMarkets].filter(m=>m!==null).map(m=>`- ${line(m!.name)}: ${line(m!.positioning)}`).join('\n')}`,
    `## Social Profiles\n\n${verifiedSocialProfiles(profile).map(url=>`- ${url}`).join('\n')}`,
  ];
  if (metrics) {
    const rows = [['Instagram followers',metrics.followers],['Instagram posts',metrics.posts],['Instagram following',metrics.following],['Instagram views (last 30 days)',metrics.views],['YouTube subscribers',metrics.youtubeSubscribers],['Most-loved reel views',metrics.lovedReelViews]].filter(([,value])=>value);
    if (rows.length) sections.push(`## Current Social Metrics\n\n${rows.map(([label,value])=>`- ${label}: ${line(value!)}`).join('\n')}\n${metrics.metricsUpdatedAt ? `- metricsUpdatedAt: ${metrics.metricsUpdatedAt}\n` : ''}\nThese figures are editor-managed in Sanity; they are not live platform measurements.`);
  }
  sections.push(`## Brand Collaboration\n\n${line(profile.collaborationCta)}\n\nPublic inquiry email: ${line(profile.email)}\n\nCollaboration categories: ${profile.industries.map(line).join(', ')}.\n\n[Collaboration inquiries](${canonicalUrl(profile,'/contact')})`);
  if (profile.services.length) sections.push(`## Services\n\n${profile.services.map(s=>`- ${line(s.title)}: ${line(s.text)}`).join('\n')}`);
  if (brands.length) sections.push(`## Brand Collaborations Listed on the Website\n\n${brands.map(b=>`- ${line(b.name)}${b.focus ? `: ${line(b.focus)}` : ''}`).join('\n')}`);
  sections.push(`## Important Website Pages\n\n${pages.map(p=>`- [${line(p.title).replace(/[\[\]]/g,'')}](${canonicalUrl(profile,p.path)})`).join('\n')}\n- [XML sitemap](${canonicalUrl(profile,'/sitemap.xml')})`);
  sections.push(`## Frequently Asked Questions\n\n${creatorFaqs(profile).map(f=>`### ${line(f.question)}\n\n${line(f.answer)}`).join('\n\n')}`);
  return sections.join('\n\n')+'\n';
}
