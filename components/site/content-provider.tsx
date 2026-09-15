'use client';
import { createContext, useContext } from 'react';
import type { SiteContent } from '@/lib/site-content-defaults';
type ChromeContent = Pick<SiteContent, 'creator' | 'navItems' | 'collaborationTypes' | 'amazonAffiliate'> & { pageCopy: Record<string, Record<string,string>>; markets: Array<{ name: string; href: string }> };
const ContentContext = createContext<ChromeContent | null>(null);
export function ContentProvider({ value, children }: {value: ChromeContent; children: React.ReactNode}) {
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}
export function useSiteContent() {
  const content = useContext(ContentContext);
  if (!content) throw new Error('Site content provider is missing');
  return content;
}

export function usePageCopy(section: string) {
  const { pageCopy } = useSiteContent();
  return (key: string) => pageCopy[section]?.[key] ?? '';
}
