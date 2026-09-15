import { defineArrayMember, defineField, defineType } from 'sanity'
import { BookOpen, Video } from 'lucide-react'

const image = (name: string, title: string) => defineField({
  name, title, type: 'image', options: { hotspot: true },
  fields: [defineField({ name: 'alt', title: 'Description for accessibility', type: 'string', validation: r => r.required() })],
})
export const blogPostType = defineType({
  name: 'blogPost', title: 'Blog posts', type: 'document', icon: BookOpen,
  groups: [{ name: 'story', title: 'Story', default: true }, { name: 'seo', title: 'Search & sharing' }],
  fields: [
    defineField({ name: 'title', type: 'string', group: 'story', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', group: 'story', options: { source: 'title', maxLength: 96 }, validation: r => r.required() }),
    defineField({ name: 'excerpt', type: 'text', rows: 3, group: 'story', validation: r => r.required() }),
    defineField({ name: 'category', type: 'string', group: 'story', initialValue: 'Journal', validation: r => r.required() }),
    defineField({ name: 'publishedAt', title: 'Publication date', type: 'datetime', group: 'story', initialValue: () => new Date().toISOString(), validation: r => r.required(), description: 'Future dates stay hidden until this time. Publish the document to make it eligible.' }),
    image('cover', 'Cover image'),
    defineField({ name: 'image', title: 'Existing cover URL (optional)', type: 'string', description: 'Used for migrated articles. An uploaded cover takes priority.' }),
    defineField({ name: 'featured', title: 'Feature on the blog landing page', type: 'boolean', initialValue: false }),
    defineField({ name: 'body', type: 'array', group: 'story', validation: r => r.required().min(1), of: [
      defineArrayMember({ type: 'block', styles: [{title: 'Paragraph', value: 'normal'}, {title: 'Heading', value: 'h2'}, {title: 'Subheading', value: 'h3'}, {title: 'Quote', value: 'blockquote'}],
        marks: { decorators: [{title: 'Bold', value: 'strong'}, {title: 'Italic', value: 'em'}], annotations: [
          { name: 'link', type: 'object', fields: [defineField({ name: 'href', type: 'url', validation: r => r.required().uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }) })] },
        ] },
      }),
      defineArrayMember(image('image', 'Image')),
    ] }),
    defineField({ name: 'description', title: 'Search description', type: 'text', rows: 3, group: 'seo', description: 'Defaults to the excerpt.' }),
    defineField({ name: 'keywords', type: 'array', group: 'seo', of: [defineArrayMember({ type: 'string' })] }),
  ],
  preview: { select: { title: 'title', subtitle: 'category', media: 'cover' } },
  orderings: [{ title: 'Newest first', name: 'newest', by: [{ field: 'publishedAt', direction: 'desc' }] }],
})
export const socialVideoType = defineType({
  name: 'socialVideo', title: 'Instagram & popular videos', type: 'document', icon: Video,
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'url', title: 'Video / Instagram reel URL', type: 'url', validation: r => r.required().uri({ scheme: ['https'] }) }),
    defineField({ name: 'platform', type: 'string', options: { list: ['Instagram', 'YouTube', 'Facebook'] }, initialValue: 'Instagram', validation: r => r.required() }),
    image('thumbnail', 'Thumbnail'),
    defineField({ name: 'image', title: 'Existing thumbnail URL (optional)', type: 'string' }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'publishedAt', title: 'Website publish date', type: 'datetime', initialValue: () => new Date().toISOString(), validation: r => r.required() }),
    defineField({ name: 'views', title: 'Views label (e.g. 82K)', type: 'string' }),
    defineField({ name: 'popular', title: 'Show in Popular videos', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Popular display order', type: 'number', initialValue: 0, validation: r => r.integer().min(0) }),
    defineField({ name: 'hidden', title: 'Hide from website', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'title', subtitle: 'platform', media: 'thumbnail' } },
})
