import { defineField, defineType } from 'sanity'

export const visualStoryType = defineType({
  name: 'visualStory',
  title: 'Visual Story',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mood',
      title: 'Mood',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'signal',
      title: 'Signal',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Existing image URL (optional if uploading)',
      type: 'string',
    }),
  ],
})
