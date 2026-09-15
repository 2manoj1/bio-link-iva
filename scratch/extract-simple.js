const fs = require('fs');
const html = fs.readFileSync('Instagram.html', 'utf8');

const regex = /\/reel\/([^/]+)\//g;
let match;
const reels = new Set();
while ((match = regex.exec(html)) !== null) {
  reels.add(match[1]);
}

console.log("Found shortcodes in HTML:", Array.from(reels));
