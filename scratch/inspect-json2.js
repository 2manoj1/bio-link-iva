const fs = require('fs');

const html = fs.readFileSync('Instagram.html', 'utf8');

const scriptRegex = /<script type="application\/json"[^>]*>([\s\S]*?)<\/script>/g;
let match;
while ((match = scriptRegex.exec(html)) !== null) {
  try {
    const data = JSON.parse(match[1]);
    
    function traverse(obj) {
      if (Array.isArray(obj)) {
        for (const item of obj) traverse(item);
      } else if (obj !== null && typeof obj === 'object') {
        if (obj.__typename === 'XDTMediaDict' && obj.code === 'DW6CUOaEX4t') {
          console.log("Keys in XDTMediaDict:", Object.keys(obj));
          console.log("play_count:", obj.play_count);
          console.log("video_view_count:", obj.video_view_count);
          console.log("image_versions2:", obj.image_versions2 ? "Yes" : "No");
          console.log("caption:", obj.caption ? obj.caption.text?.substring(0, 50) : "No");
          if (obj.image_versions2) {
             console.log("url:", obj.image_versions2.candidates?.[0]?.url);
          }
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
