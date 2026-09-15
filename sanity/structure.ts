import type { StructureResolver } from 'sanity/structure'

export const singletons = [
  { type: 'pageCopy', id: 'singleton-page-copy', title: 'Page headings & copy' },
  { type: 'siteContent', id: 'singleton-site-content', title: 'Site settings & content' },
  { type: 'creatorProfile', id: 'singleton-creator-profile', title: 'Profile & Instagram Bio' },
  { type: 'instagramStats', id: 'singleton-instagram-stats', title: 'Instagram Stats' },
  { type: 'mediaKit', id: 'singleton-media-kit', title: 'Media Kit' },
]
export const singletonTypes = new Set(singletons.map(item => item.type))

export const structure: StructureResolver = (S) =>
  S.list().title('Iva Content CMS').items([
    ...singletons.map(item => S.listItem().id(item.type).title(item.title)
      .child(S.document().schemaType(item.type).documentId(item.id))),
    S.divider(),
    ...S.documentTypeListItems().filter(item => !singletonTypes.has(item.getId()!)),
  ])
