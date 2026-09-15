import { mediaKitDefaults } from '../../lib/site-content-defaults'
import { contentField } from './contentFields'
import { defineField, defineType } from 'sanity'

export const mediaKitType = defineType({
  name: 'mediaKit',
  title: 'Media Kit',
  type: 'document',
  fields: [
    ...Object.entries(mediaKitDefaults).filter(([name]) => !["reportingWindow","dashboardWindow","insights","profileSnapshot","collaborationHighlights"].includes(name)).map(([name,value]) => contentField(name,value)),
    defineField({
      name: 'reportingWindow',
      title: 'Reporting Window',
      type: 'string',
    }),
    defineField({
      name: 'dashboardWindow',
      title: 'Dashboard Window',
      type: 'string',
    }),
    defineField({
      name: 'interactions',
      title: 'Interactions',
      type: 'string',
    }),
    defineField({
      name: 'contentShared',
      title: 'Content Shared',
      type: 'string',
    }),
  ],
})
