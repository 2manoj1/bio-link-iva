import 'server-only';
import { cache } from 'react';
import { fetchContent } from '@/sanity/fetch';
import { mergeContentDefaults } from './content-defaults';
import defaults from '@/sanity/data/page-copy.json';

export const getAllPageCopy = cache(async (): Promise<Record<string, Record<string,string>>> => {
  const result = await fetchContent<Record<string, Record<string, string>> | null>(
    '*[_id=="singleton-page-copy"][0]', {}, null
  );
  return mergeContentDefaults(defaults, result);
});
export async function getPageCopy(section: string) {
  const content = await getAllPageCopy();
  const fallback = (defaults as Record<string, Record<string,string>>)[section] ?? {};
  return (key: string) => content[section]?.[key] ?? fallback[key] ?? '';
}
