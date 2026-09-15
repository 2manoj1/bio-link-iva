import { defineField, defineType } from 'sanity'

export const shopQuickLinkType = defineType({
  name: 'shopQuickLink',
  title: 'Shop Quick Link',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Display order (lower first)', type: 'number', initialValue: 0, validation: r => r.integer().min(0) }),
    defineField({ name: 'hidden', title: 'Hide from website', type: 'boolean', initialValue: false }),

    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'search',
      title: 'Amazon Search Term',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
  ],
})
