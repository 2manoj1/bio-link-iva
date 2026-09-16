import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canonicalUrl, creatorFaqs, creatorStructuredData, renderLlmsText, verifiedSocialProfiles } from '../lib/creator-discovery';
import type { CreatorIdentity } from '../lib/creator-identity';
import type { SocialMetrics } from '../lib/social-metrics';
const profile = {
  name:'Example Creator',title:'Digital creator',description:'A creator in Bengaluru.',positioning:'Food and travel.',
  longDescription:'',location:'Bengaluru (Bangalore), India',email:'creator@example.com',whatsappNumber:'',
  username:'example',handle:'@example',instagramUrl:'https://www.instagram.com/example/',
  youtubeUrl:'https://www.youtube.com/@example',facebookPageUrl:'',websiteUrl:'https://example.com',
  profileImage:'/portrait.jpg',heroImage:'',displayName:'Example Creator',category:'Lifestyle',profileLine:'',
  birthday:'',identity:'',collaborationCta:'Email for collaborations',contentPillars:['Food','Travel'],
  collaborationHighlights:[],recentCollaborationSignals:[],threadsHandle:'',links:[],featuredReels:[],
  primaryMarket:{name:'Bengaluru',href:'/bengaluru-guide',positioning:'Home city'},additionalMarkets:[],
  industries:['Hospitality'],services:[{title:'Creator visit',text:'A hosted visit.'}],
} satisfies CreatorIdentity;
const metrics = {followers:'123K',posts:'456',metricsUpdatedAt:'2026-09-15T00:00:00Z'} as SocialMetrics;
test('discovery uses supplied CMS identity, metrics, dates and public canonical pages',()=>{
  const output=renderLlmsText(profile,metrics,[{path:'/about',title:'About'}],[{name:'Example brand'}]);
  assert.match(output,/Instagram followers: 123K/);
  assert.match(output,/Instagram posts: 456/);
  assert.match(output,/metricsUpdatedAt: 2026-09-15T00:00:00Z/);
  assert.match(output,/https:\/\/example.com\/about/);
  assert.match(output,/Example brand/);
  assert.doesNotMatch(output,/58\.9K|80K|812|875|undefined|drafts\./);
  const updated=renderLlmsText({...profile,description:'An updated biography.'},{...metrics,followers:'124K'},[],[]);
  assert.match(updated,/An updated biography/); assert.match(updated,/124K/); assert.doesNotMatch(updated,/123K/);
});
test('structured data, FAQ and llms share one entity and official social links',()=>{
  const [person,site]=creatorStructuredData(profile);
  assert.equal(person.name,profile.name); assert.equal(person.description,creatorFaqs(profile)[0].answer);
  assert.equal(person['@id'],site.publisher?.['@id']);
  assert.equal(person.image,'https://example.com/portrait.jpg');
  assert.deepEqual(person.sameAs,verifiedSocialProfiles(profile));
  assert.equal(canonicalUrl(profile), 'https://example.com/');
  assert.deepEqual(verifiedSocialProfiles({...profile,facebookPageUrl:'javascript:alert(1)'}),[profile.instagramUrl,profile.youtubeUrl]);
});
test('missing metrics are omitted instead of replaced with stale sample counts',()=>{
  const output=renderLlmsText(profile,null,[],[]);
  assert.doesNotMatch(output,/Current Social Metrics|followers:|metricsUpdatedAt:/);
});
