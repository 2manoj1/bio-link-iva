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
        if (obj.code === 'DW6CUOaEX4t' || obj.shortcode === 'DW6CUOaEX4t') {
          console.log("Found obj:", JSON.stringify(obj, null, 2).substring(0, 500));
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
