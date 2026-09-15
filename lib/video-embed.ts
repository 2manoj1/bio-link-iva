export function videoEmbedUrl(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return null;
    const host = url.hostname.toLowerCase();
    if (['instagram.com','www.instagram.com'].includes(host)) {
      const match = url.pathname.match(/^\/(?:reel|p|tv)\/([A-Za-z0-9_-]+)\/?$/);
      return match ? `https://www.instagram.com/p/${match[1]}/embed/` : null;
    }
    if (['youtube.com','www.youtube.com','youtu.be'].includes(host)) {
      const id = host==='youtu.be' ? url.pathname.slice(1) : url.pathname.startsWith('/shorts/') ? url.pathname.split('/')[2] : url.searchParams.get('v');
      return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    return null;
  } catch { return null; }
}
