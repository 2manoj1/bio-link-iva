const fs = require('fs');
const html = fs.readFileSync('Instagram.html', 'utf8');
const scriptRegex = /<script type="application\/json"[^>]*>([\s\S]*?)<\/script>/g;
let match;
let foundCount = 0;
while ((match = scriptRegex.exec(html)) !== null) {
  try {
    const data = JSON.parse(match[1]);
    function traverse(obj) {
      if (Array.isArray(obj)) {
        for (const item of obj) traverse(item);
      } else if (obj !== null && typeof obj === 'object') {
        if (typeof obj.node === 'object' && obj.node?.shortcode && foundCount < 5) {
           console.log("Found shortcode node:", obj.node.shortcode);
           console.log("keys:", Object.keys(obj.node));
           if (obj.node.video_view_count) console.log("video_view_count:", obj.node.video_view_count);
           if (obj.node.play_count) console.log("play_count:", obj.node.play_count);
           foundCount++;
        }
        for (const key of Object.keys(obj)) {
          traverse(obj[key]);
        }
      }
    }
    traverse(data);
  } catch (e) {
  }
}
