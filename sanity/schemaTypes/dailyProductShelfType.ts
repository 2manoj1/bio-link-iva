import { defineField, defineType } from 'sanity'

export const dailyProductShelfType = defineType({
  name: 'dailyProductShelf',
  title: 'Daily Product Shelf',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Display order (lower first)', type: 'number', initialValue: 0, validation: r => r.integer().min(0) }),
    defineField({ name: 'hidden', title: 'Hide from website', type: 'boolean', initialValue: false }),
    defineField({ name: 'cover', title: 'Upload image', type: 'image', options: { hotspot: true },
      description: 'An uploaded image takes priority over the existing image URL.',
      fields: [defineField({ name: 'alt', title: 'Image description', type: 'string', validation: r => r.required() })] }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'moment',
      title: 'Moment',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Existing image URL (optional if uploading)',
      type: 'string',
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Product Name', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'note', title: 'Note', type: 'text', validation: Rule => Rule.required() }),
            defineField({ name: 'search', title: 'Amazon Search', type: 'string', validation: Rule => Rule.required() }),
          ],
        },
      ],
    }),
  ],
})
