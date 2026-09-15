const fs = require('fs');
const html = fs.readFileSync('Instagram.html', 'utf8');
const scriptRegex = /<script type="application\/json"[^>]*>([\s\S]*?)<\/script>/g;

let count = 0;
let match;
while ((match = scriptRegex.exec(html)) !== null) {
  try {
    const data = JSON.parse(match[1]);
    
    function traverse(obj) {
      if (Array.isArray(obj)) {
        for (const item of obj) traverse(item);
      } else if (obj !== null && typeof obj === 'object') {
        if (obj.__typename === 'XDTMediaDict' && obj.code) {
           console.log(obj.code, "view_count:", obj.view_count, "play_count:", obj.play_count);
           count++;
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
console.log("Total XDTMediaDict objects:", count);
