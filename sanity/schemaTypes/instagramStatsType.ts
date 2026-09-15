import { defineField, defineType } from 'sanity'

export const instagramStatsType = defineType({
  name: 'instagramStats',
  title: 'Instagram Stats',
  type: 'document',
  fields: [
    defineField({
      name: 'followers',
      title: 'Followers',
      type: 'string',
    }),
    defineField({
      name: 'posts',
      title: 'Posts',
      type: 'string',
    }),
    defineField({
      name: 'following',
      title: 'Following',
      type: 'string',
    }),
    defineField({
      name: 'views',
      title: 'Views (Last 30 Days)',
      type: 'string',
    }),
    defineField({
      name: 'demographicsAge',
      title: 'Demographics Age',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Age Range (e.g., 18-24)' },
            { name: 'value', type: 'number', title: 'Percentage (%)' },
          ]
        }
      ]
    }),
    defineField({
      name: 'demographicsGender',
      title: 'Demographics Gender',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Gender' },
            { name: 'value', type: 'number', title: 'Percentage (%)' },
          ]
        }
      ]
    }),
  ],
})
