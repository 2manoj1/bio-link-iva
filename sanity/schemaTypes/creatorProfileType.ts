import { defineArrayMember, defineField, defineType } from 'sanity'
import { User as UserIcon } from 'lucide-react'

export const creatorProfileType = defineType({
  name: 'creatorProfile',
  title: 'Creator identity & profiles',
  type: 'document',
  icon: UserIcon,
  description: 'The single source for website identity, SEO, structured data and llms.txt. Audience counts live in Social metrics.',
  fields: [
    ...[['name', 'Name'], ['title', 'Professional title'], ['positioning', 'Short description'], ['description', 'Biography / search description'], ['longDescription', 'Long biography'], ['email', 'Public collaboration email'], ['whatsappNumber', 'Public WhatsApp number'], ['profileImage', 'Profile image URL or site path'], ['heroImage', 'Hero image URL or site path']].map(([name, title]) => defineField({ name, title, type: name.includes('escription') ? 'text' : 'string', validation: rule => name === 'longDescription' ? rule : rule.required() })),
    ...[['youtubeUrl', 'Verified YouTube URL'], ['facebookPageUrl', 'Verified Facebook URL']].map(([name, title]) => defineField({ name, title, type: 'url', validation: rule => rule.uri({ scheme: ['https'] }) })),
    defineField({ name: 'primaryMarket', title: 'Primary market', type: 'reference', to: [{ type: 'market' }], validation: rule => rule.required() }),
    defineField({ name: 'additionalMarkets', title: 'Additional markets', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'market' }] })], validation: rule => rule.unique() }),
    defineField({ name: 'industries', title: 'Collaboration categories / industries', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'services', title: 'Collaboration services', type: 'array', of: [defineArrayMember({ name: 'creatorService', type: 'object', fields: [defineField({ name: 'title', type: 'string', validation: rule => rule.required() }), defineField({ name: 'text', title: 'Description', type: 'text', validation: rule => rule.required() })] })] }),
    ...[
      ['username', 'Instagram username (without @)'],
      ['displayName', 'Display name'],
      ['category', 'Category'],
      ['profileLine', 'Bio / niche'],
      ['birthday', 'Birthday'],
      ['location', 'Location'],
      ['identity', 'Identity / tag'],
      ['collaborationCta', 'Collaboration inquiries'],
      ['threadsHandle', 'Threads handle'],
    ].map(([name, title]) => defineField({ name, title, type: 'string', validation: rule => rule.required() })),
    ...[['instagramUrl', 'Instagram URL'], ['websiteUrl', 'Website URL']].map(([name, title]) =>
      defineField({ name, title, type: 'url', validation: rule => rule.required().uri({ scheme: ['https'] }) })),
    ...[
      ['contentPillars', 'Content pillars'],
      ['collaborationHighlights', 'Story highlights (drag to reorder)'],
      ['recentCollaborationSignals', 'Recent collaboration names'],
    ].map(([name, title]) => defineField({
      name, title, type: 'array', of: [defineArrayMember({ type: 'string' })],
      validation: rule => rule.unique(),
    })),
    defineField({
      name: 'links', title: 'Profile links', type: 'array',
      description: 'Add the remaining Instagram bio links when their URLs are available.',
      of: [defineArrayMember({ type: 'object', name: 'profileLink', fields: [
        defineField({ name: 'label', type: 'string', validation: rule => rule.required() }),
        defineField({ name: 'href', title: 'URL', type: 'url', validation: rule => rule.required().uri({ scheme: ['https', 'http'] }) }),
      ] })],
    }),
    defineField({
      name: 'featuredReels', title: 'Featured / pinned reels', type: 'array',
      description: 'Drag to reorder. Add an exact reel URL when available; without one the title is shown without a link.',
      of: [defineArrayMember({ type: 'object', name: 'featuredReel', fields: [
        defineField({ name: 'title', type: 'string', validation: rule => rule.required() }),
        defineField({ name: 'description', type: 'text', rows: 2 }),
        defineField({ name: 'href', title: 'Reel URL', type: 'url', validation: rule => rule.uri({ scheme: ['https'] }) }),
      ] })],
    }),
  ],
  preview: { select: { title: 'displayName', subtitle: 'username' } },
})
