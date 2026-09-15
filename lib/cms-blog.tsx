import 'server-only';
import { cache } from 'react';
import Image from 'next/image';
import { PortableText, type PortableTextBlock, type PortableTextComponents } from 'next-sanity';
import { fetchContent } from '@/sanity/fetch';
import type { BlogPost } from './blog';

type Article = {
  _id: string; slug: string; title: string; excerpt: string; description?: string;
  category: string; publishedAt: string; image?: string; keywords?: string[];
  body: PortableTextBlock[]; featured?: boolean;
};
const projection = `{_id,title,"slug":slug.current,excerpt,description,category,publishedAt,featured,
  "image":coalesce(cover.asset->url,image),keywords,
  body[]{...,_type=="image"=>{...,"url":asset->url}}}`;
const filter = `_type=="blogPost" && defined(slug.current) && defined(body) && dateTime(publishedAt)<=dateTime(now())`;
const components: PortableTextComponents = {
  block: {
    normal: ({children}) => <p className="text-lg leading-8 text-[var(--text-body)]">{children}</p>,
    h2: ({children,value}) => <h2 id={value._key} className="pt-8 font-serif text-4xl">{children}</h2>,
    h3: ({children,value}) => <h3 id={value._key} className="pt-5 font-serif text-3xl">{children}</h3>,
    blockquote: ({children}) => <blockquote className="border-l-2 border-[var(--gold)] pl-5 font-serif text-3xl italic">{children}</blockquote>,
  },
  marks: { link: ({children,value}) => {
    const href = typeof value?.href === 'string' && /^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(value.href) ? value.href : undefined;
    return <a href={href} className="underline decoration-[var(--gold)]">{children}</a>;
  } },
  list: {
    bullet: ({children}) => <ul className="list-disc space-y-2 pl-6">{children}</ul>,
    number: ({children}) => <ol className="list-decimal space-y-2 pl-6">{children}</ol>,
  },
  types: { image: ({value}) => value.url ? <figure><Image src={value.url} alt={value.alt ?? ''} width={1200} height={800} className="h-auto w-full rounded-md" /></figure> : null },
};
function asPost(article: Article): BlogPost {
  const words = article.body.flatMap(block => block.children ?? []).map(span => span.text ?? '').join(' ').split(/\s+/).length;
  return {
    ...article,
    description: article.description || article.excerpt,
    image: article.image || '/iva/editorial-saree-portrait.jpeg',
    keywords: article.keywords ?? [],
    date: new Date(article.publishedAt).toLocaleDateString('en-GB', {month: 'long', year: 'numeric', timeZone: 'UTC'}),
    readTime: `${Math.max(1, Math.ceil(words / 200))} min read`,
    mood: article.category,
    toc: article.body.filter(block => Boolean(block._key) && (block.style === 'h2' || block.style === 'h3')).map(block => ({
      id: block._key!, title: (block.children ?? []).map(span => span.text ?? '').join(''),
    })),
    Content: () => <PortableText value={article.body} components={components} />,
  };
}
export const getPublishedBlogPosts = cache(async () => {
  const articles = await fetchContent<Article[]>(`*[${filter}] | order(featured desc,publishedAt desc) ${projection}`, {}, []);
  return articles.map(asPost);
});
export const getPublishedBlogPost = cache(async (slug: string) => {
  const article = await fetchContent<Article | null>(`*[${filter} && slug.current==$slug][0] ${projection}`, {slug}, null);
  return article ? asPost(article) : undefined;
});
export async function getPublishedRelatedPosts(post: BlogPost) {
  return (await getPublishedBlogPosts()).filter(item => item.slug !== post.slug).slice(0, 3);
}
