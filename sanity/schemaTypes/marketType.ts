import { defineField, defineType } from 'sanity'

export const marketType = defineType({
  name: 'market',
  title: 'Market',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Display order (lower first)', type: 'number', initialValue: 0, validation: r => r.integer().min(0) }),
    defineField({ name: 'hidden', title: 'Hide from website', type: 'boolean', initialValue: false }),
    defineField({ name: 'cover', title: 'Upload image', type: 'image', options: { hotspot: true },
      description: 'An uploaded image takes priority over the existing image URL.',
      fields: [defineField({ name: 'alt', title: 'Image description', type: 'string', validation: r => r.required() })] }),

    defineField({
      name: 'name',
      title: 'City/Market Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link (href)',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'positioning',
      title: 'Positioning',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Existing image URL (optional if uploading)',
      type: 'string',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
