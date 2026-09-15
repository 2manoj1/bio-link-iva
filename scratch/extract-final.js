const fs = require('fs');

const html = fs.readFileSync('Instagram.html', 'utf8');
const scriptRegex = /<script type="application\/json"[^>]*>([\s\S]*?)<\/script>/g;

const items = new Map();

function formatViews(count) {
  if (!count) return '0';
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(0) + 'K';
  }
  return count.toString();
}

let match;
while ((match = scriptRegex.exec(html)) !== null) {
  try {
    const data = JSON.parse(match[1]);
    
    function traverse(obj) {
      if (Array.isArray(obj)) {
        for (const item of obj) traverse(item);
      } else if (obj !== null && typeof obj === 'object') {
        if (obj.__typename === 'XDTMediaDict' && obj.code) {
          if (!items.has(obj.code) || obj.view_count !== undefined) {
             items.set(obj.code, {
               code: obj.code,
               view_count: obj.view_count || items.get(obj.code)?.view_count || 0,
               title: obj.caption?.text?.split('\n')[0]?.substring(0, 50) || 'Instagram Reel',
               thumbnail: obj.image_versions2?.candidates?.[0]?.url || '',
             });
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

const sortedItems = Array.from(items.values())
  .filter(item => item.view_count > 0)
  .sort((a, b) => b.view_count - a.view_count);

const premiumExperiences = sortedItems.slice(0, 15).map(item => ({
  _id: `exp-${item.code}`,
  _type: "premiumExperience",
  title: item.title,
  category: "Reel",
  views: formatViews(item.view_count),
  link: `https://www.instagram.com/reel/${item.code}/`,
  image: item.thumbnail
}));

fs.writeFileSync('scratch/extracted-reels.json', JSON.stringify(premiumExperiences, null, 2));
console.log(`Extracted top ${premiumExperiences.length} reels into scratch/extracted-reels.json`);
