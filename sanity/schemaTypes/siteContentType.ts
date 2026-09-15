import { defineType } from 'sanity';
import { Settings } from 'lucide-react';
import { siteContentDefaults } from '../../lib/site-content-defaults';
import { contentField } from './contentFields';
export const siteContentType = defineType({
  name: 'siteContent', title: 'Site settings & content', type: 'document', icon: Settings,
  description: 'Shared identity, contact details, navigation, imagery, affiliate settings, collaboration options, city guides and editorial content.',
  fields: Object.entries(siteContentDefaults).map(([name,value]) => contentField(name,value)),
  preview: { prepare: () => ({ title: 'Site settings & content' }) },
});
