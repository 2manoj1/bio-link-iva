import 'server-only';
import { getSiteContent } from './site-content';
import { getPublishedBlogPosts } from './cms-blog';

export const publicPaths = ['/', '/about', '/collaborations', '/bengaluru-guide', '/goa-escapes', '/goa-escapes/boutique-stays', '/mumbai-experiences', '/mumbai-experiences/cafes', '/pune-discoveries', '/pune-discoveries/cafes', '/media-kit', '/contact', '/links', '/shop', '/blog', '/premium-experiences', '/kolkata-experiences'];
export async function getPublicPages() {
  const [content, posts] = await Promise.all([getSiteContent(), getPublishedBlogPosts()]);
  return [
    ...publicPaths.map(path => ({ path, title: path === '/' ? content.creator.name : content.seo.find(item=>item.path===path)?.title || path.slice(1) })),
    ...content.neighborhoods.map(area=>({path:`/bengaluru-guide/${area.slug}`,title:area.title})),
    ...posts.map(post=>({path:`/blog/${post.slug}`,title:post.title})),
  ];
}
