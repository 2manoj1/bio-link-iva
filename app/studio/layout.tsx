import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content Studio',
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0">{children}</div>;
}
