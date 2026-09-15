import fs from 'node:fs';

const html = fs.readFileSync('Instagram.html', 'utf8');

const items = new Map();

// We need to parse the JSON chunks. Instagram puts them in script tags.
const scriptRegex = /<script type="application\/json"[^>]*>([\s\S]*?)<\/script>/g;
let match;
while ((match = scriptRegex.exec(html)) !== null) {
  try {
    const data = JSON.parse(match[1]);
    
    // We want to recursively traverse the JSON and find all objects that have a shortcode and display_url or play_count
    function traverse(obj) {
      if (Array.isArray(obj)) {
        for (const item of obj) traverse(item);
      } else if (obj !== null && typeof obj === 'object') {
        if (obj.shortcode && obj.play_count !== undefined) {
          if (!items.has(obj.shortcode)) {
            items.set(obj.shortcode, {
              shortcode: obj.shortcode,
              play_count: obj.play_count,
              title: obj.title || obj.edge_media_to_caption?.edges?.[0]?.node?.text?.substring(0, 100) || '',
              thumbnail_src: obj.display_url || obj.thumbnail_src || '',
              is_video: obj.is_video
            });
          }
        } else if (obj.code && obj.video_view_count !== undefined) {
             items.set(obj.code, {
              shortcode: obj.code,
              play_count: obj.video_view_count,
              title: obj.caption?.text?.substring(0, 100) || '',
              thumbnail_src: obj.image_versions2?.candidates?.[0]?.url || '',
              is_video: true
            });
        }
        for (const key of Object.keys(obj)) {
          traverse(obj[key]);
        }
      }
    }
    traverse(data);
  } catch {
    // Ignore invalid JSON
  }
}

const sortedItems = Array.from(items.values())
  .filter(item => item.play_count > 0)
  .sort((a, b) => b.play_count - a.play_count);

console.log(`Found ${sortedItems.length} videos`);
console.log(JSON.stringify(sortedItems.slice(0, 10), null, 2));

// Export as JSON array so we can read it easily
fs.writeFileSync('scratch/reels.json', JSON.stringify(sortedItems, null, 2));