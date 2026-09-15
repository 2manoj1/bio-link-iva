import { defineField, defineType } from 'sanity'

export const trustedBrandType = defineType({
  name: 'trustedBrand',
  title: 'Trusted Brand',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Display order (lower first)', type: 'number', initialValue: 0, validation: r => r.integer().min(0) }),
    defineField({ name: 'hidden', title: 'Hide from website', type: 'boolean', initialValue: false }),

    defineField({
      name: 'name',
      title: 'Brand Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'focus',
      title: 'Focus',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'metric',
      title: 'Metric',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
  ],
})
