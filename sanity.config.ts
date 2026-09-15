import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schema } from './sanity/schemaTypes';
import { structure, singletonTypes } from './sanity/structure';
import { dataset, projectId } from './sanity/env';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    ...schema,
    templates: templates => templates.filter(item => !singletonTypes.has(item.schemaType)),
  },
  document: {
    actions: (actions, context) => singletonTypes.has(context.schemaType)
      ? actions.filter(item => item.action && ['publish', 'discardChanges', 'restore'].includes(item.action))
      : actions,
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],
});
