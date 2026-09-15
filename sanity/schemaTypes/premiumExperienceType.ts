import { defineField, defineType } from 'sanity'

export const premiumExperienceType = defineType({
  name: 'premiumExperience',
  title: 'Premium Experience',
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
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'views',
      title: 'Views',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Instagram Link',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Image URL',
      type: 'string',
    }),
  ],
})
