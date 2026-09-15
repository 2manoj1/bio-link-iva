import { groq } from 'next-sanity'

export const instagramStatsQuery = groq`*[_id == "singleton-instagram-stats"][0] {
  followers,
  posts,
  following,
  views,
  demographicsAge,
  demographicsGender
}`

export const mediaKitQuery = groq`*[_id == "singleton-media-kit"][0] {
  reportingWindow,
  dashboardWindow,
  interactions,
  contentShared
}`

export const premiumExperiencesQuery = groq`*[_type == "premiumExperience" && hidden != true] | order(order asc, _createdAt desc) {
  _id,
  title,
  category,
  views,
  link,
  "image": coalesce(cover.asset->url, image)
}`

export const visualStoriesQuery = groq`*[_type == "visualStory" && hidden != true] | order(order asc, _createdAt asc) {
  _id,
  title,
  category,
  mood,
  format,
  signal,
  "image": coalesce(cover.asset->url, image)
}`

export const trustedBrandsQuery = groq`*[_type == "trustedBrand" && hidden != true] | order(order asc, _createdAt asc) {
  _id,
  name,
  focus,
  metric
}`

export const marketsQuery = groq`*[_type == "market" && hidden != true] | order(order asc, _createdAt asc) {
  _id,
  name,
  href,
  role,
  positioning,
  "image": coalesce(cover.asset->url, image),
  keywords
}`

export const shopQuickLinksQuery = groq`*[_type == "shopQuickLink" && hidden != true] | order(order asc, _createdAt asc) {
  _id,
  label,
  description,
  search
}`

export const dailyProductShelvesQuery = groq`*[_type == "dailyProductShelf" && hidden != true] | order(order asc, _createdAt asc) {
  _id,
  title,
  slug,
  moment,
  "image": coalesce(cover.asset->url, image),
  imagePosition,
  products
}`

export const creatorProfileQuery = groq`*[_id == "singleton-creator-profile"][0]{username, displayName, category, profileLine, birthday, location, identity, collaborationCta, contentPillars, collaborationHighlights, recentCollaborationSignals, instagramUrl, threadsHandle, websiteUrl, links[]{_key,label,href}, featuredReels[]{_key,title,description,href}}`
