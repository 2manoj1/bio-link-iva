import type { Metadata } from "next";

export const siteUrl = "https://iva.manojmukherjee.co.in";

export const creator = {
  name: "Iva Chatterjee",
  handle: "@iva_mana5",
  username: "iva_mana5",
  title: "Luxury Lifestyle Creator",
  positioning: "Beauty, food, travel, and lifestyle through a polished Bangalore lens.",
  description:
    "Iva Chatterjee is a Bangalore digital creator sharing beauty, food, travel, lifestyle, cafe, hotel, fashion, and city experiences with a soft luxury point of view.",
  location: "Bengaluru (Bangalore), India",
  email: "ivachatterjee5@gmail.com",
  instagramUrl: "https://www.instagram.com/iva_mana5/",
  youtubeUrl: "https://www.youtube.com/@Maniva777",
  facebookPageUrl: "https://www.facebook.com/maniva777",
  websiteUrl: "https://iva.manojmukherjee.co.in",
  profileImage: "/iva/editorial-saree-portrait.jpeg",
  heroImage: "/iva/rooftop-blue-evening.jpeg",
};

export const amazonAffiliate = {
  label: "Amazon",
  tag: "ivamana5-21",
  baseUrl: "https://www.amazon.in/s",
  storefrontUrl: "https://www.amazon.in/shop/ivamana5",
};

export const shopQuickLinks = [
  {
    label: "Beauty Minis",
    description: "Small touch-up products for bags, reels, and travel days.",
    search: "women beauty minis travel size makeup",
  },
  {
    label: "Cafe Outfits",
    description: "Soft, polished pieces for brunches and dressed-up coffee plans.",
    search: "women cafe outfit dresses tops",
  },
  {
    label: "Creator Tools",
    description: "Tripods, lights, and little helpers for filming smoother content.",
    search: "content creator kit phone tripod light mic",
  },
  {
    label: "Travel Pouches",
    description: "Pretty organizers for stays, skincare, and weekend packing.",
    search: "women travel pouch organizer cosmetic bag",
  },
  {
    label: "Soft Home",
    description: "Candles, tumblers, and desk details for slower reset days.",
    search: "aesthetic home decor candle glass tumbler",
  },
  {
    label: "Gift Finds",
    description: "Easy beauty and lifestyle gifts for birthdays and small surprises.",
    search: "premium gifts for women beauty lifestyle",
  },
];

export const instagramProfile = {
  username: "iva_mana5",
  displayName: "Iva Chatterjee | Bangalore Influencer",
  category: "Digital creator",
  posts: "812",
  followers: "58.9K",
  following: "961",
  profileLine: "Beauty | Food | Travel | Lifestyle",
  birthday: "23 March",
  location: "Bangalore",
  identity: "Bong",
  collaborationCta: "DM or mail for paid collaboration",
  contentPillars: ["Beauty", "Food", "Travel", "Lifestyle"],
  collaborationHighlights: [
    "Furniture Collab",
    "Salon Collab",
    "Hilton",
    "Food Collab",
    "Collab & Concert",
    "Fashion Collab",
    "Resort Collab",
    "Fashion Show",
  ],
  recentCollaborationSignals: [
    "Hair Masters Luxury Salon",
    "Hilton Manyata",
    "The Bier Library",
    "Swiggy Giftables",
    "Tipsy Bull",
    "Nandhana Palace",
    "Long Boat Brewing Co.",
    "Estee Lauder at Sephora",
    "Michael Kors",
  ],
};

export const ivaImages = {
  heritageSaree: "/iva/heritage-saree-hospitality.jpeg",
  poolsidePink: "/iva/poolside-pink-evening.jpeg",
  editorialSaree: "/iva/editorial-saree-portrait.jpeg",
  bearHouseRetail: "/iva/bear-house-retail.jpeg",
  rooftopPool: "/iva/rooftop-pool-campaign.jpeg",
  rooftopBar: "/iva/rooftop-bar-night.jpeg",
  hiltonChef: "/iva/hilton-chef-collaboration.jpeg",
  rooftopBlue: "/iva/rooftop-blue-evening.jpeg",
  doubletreeArrival: "/iva/doubletree-arrival.jpeg",
  pinkCafe: "/iva/pink-cafe-cocktail.jpeg",
  fineDining: "/iva/fine-dining-table.jpeg",
};

export const navItems = [
  { label: "About", href: "/about" },
  { label: "Collaborations", href: "/collaborations" },
  { label: "Media Kit", href: "/media-kit" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const markets = [
  {
    name: "Bengaluru",
    href: "/bengaluru-guide",
    role: "Home City",
    positioning:
      "Rooftops, cafés, boutique stays, and city nights Iva truly loves.",
    image: ivaImages.rooftopBar,
    keywords: [
      "Bengaluru lifestyle creator",
      "Bangalore premium experiences",
      "hidden luxury cafés Bangalore",
      "Bangalore couple experiences",
    ],
  },
  {
    name: "Goa",
    href: "/goa-escapes",
    role: "Slow Escape",
    positioning:
      "Boutique stays, sunset tables, poolside light, and slower coastal days.",
    image: ivaImages.poolsidePink,
    keywords: ["premium Goa staycation", "Goa boutique stays"],
  },
  {
    name: "Mumbai",
    href: "/mumbai-experiences",
    role: "City Energy",
    positioning:
      "Fashion-led cafés, hotel moments, and sharper city energy.",
    image: ivaImages.rooftopBlue,
    keywords: ["Mumbai luxury cafés", "Mumbai premium hospitality"],
  },
  {
    name: "Pune",
    href: "/pune-discoveries",
    role: "Quiet Discoveries",
    positioning:
      "Calm cafés, thoughtful menus, and easy weekend discoveries.",
    image: ivaImages.pinkCafe,
    keywords: ["Pune hidden cafés", "Pune cafés"],
  },
  {
    name: "Kolkata",
    href: "/kolkata-experiences",
    role: "Selective Heritage",
    positioning:
      "Heritage stays, cultural dining, and stories with old-world charm.",
    image: ivaImages.heritageSaree,
    keywords: ["Kolkata heritage luxury", "Kolkata boutique experiences"],
  },
];

export const stats = [
  { label: "Instagram", value: instagramProfile.followers, note: "Followers" },
  { label: "Posts", value: instagramProfile.posts, note: "Always-on creator" },
  { label: "YouTube", value: "16K+", note: "Maniva community" },
  { label: "Loved Reel", value: "319K", note: "Most-loved moment" },
];

export const dailyProductShelves = [
  {
    title: "Soft Glam Kit",
    slug: "soft-glam-kit",
    moment: "For reels, brunches, events, and camera-ready city days.",
    image: ivaImages.editorialSaree,
    imagePosition: "50% 12%",
    products: [
      {
        name: "Hydrating skin prep",
        note: "The kind of base that keeps makeup looking fresh, not heavy.",
        search: "hydrating primer moisturizer",
      },
      {
        name: "Everyday nude lip",
        note: "A polished lip shade for cafes, meetings, and soft glam looks.",
        search: "nude lipstick long lasting women",
      },
      {
        name: "Compact glow palette",
        note: "One small palette for blush, highlight, and quick touch-ups.",
        search: "makeup face palette blush highlighter",
      },
      {
        name: "Soft kohl pencil",
        note: "A quick eye detail for dinner plans, saree looks, and event nights.",
        search: "smudge proof kajal kohl pencil women",
      },
      {
        name: "Makeup setting spray",
        note: "Useful for long brunches, shoots, and humid city days.",
        search: "makeup setting spray long lasting",
      },
      {
        name: "Mini brush set",
        note: "Small enough for a pouch, polished enough for touch-ups.",
        search: "mini makeup brush set travel",
      },
    ],
  },
  {
    title: "Cafe Day Bag",
    slug: "cafe-day-bag",
    moment: "For coffee plans, shopping walks, creator meetings, and light shoot days.",
    image: ivaImages.pinkCafe,
    imagePosition: "50% 18%",
    products: [
      {
        name: "Mini sling bag",
        note: "Small enough for a pretty outfit, useful enough for the day.",
        search: "women mini sling bag premium",
      },
      {
        name: "Gold hoops",
        note: "Simple jewelry that makes even a casual cafe look feel styled.",
        search: "gold plated hoop earrings women",
      },
      {
        name: "Portable perfume",
        note: "A small fragrance layer before brunch, dinner, or events.",
        search: "women travel size perfume",
      },
      {
        name: "Neutral hair claw",
        note: "For soft updos, windy rooftop evenings, and easy cafe days.",
        search: "neutral hair claw clip women",
      },
      {
        name: "Aesthetic phone case",
        note: "A small detail that shows up in mirror shots and flatlays.",
        search: "aesthetic phone case women",
      },
      {
        name: "Tinted sunglasses",
        note: "For sunny tables, shopping walks, and travel-day photos.",
        search: "women tinted sunglasses fashion",
      },
    ],
  },
  {
    title: "Staycation Essentials",
    slug: "staycation-essentials",
    moment: "For hotel check-ins, poolside plans, resort mornings, and weekend escapes.",
    image: ivaImages.poolsidePink,
    imagePosition: "50% 20%",
    products: [
      {
        name: "Satin sleep set",
        note: "Soft, photogenic, and easy to pack for a hotel night.",
        search: "women satin night suit set",
      },
      {
        name: "Travel toiletry pouch",
        note: "Keeps skincare, minis, and touch-up products cleanly organized.",
        search: "travel toiletry pouch women waterproof",
      },
      {
        name: "Poolside cover-up",
        note: "A light layer for resort breakfasts and sunset pool moments.",
        search: "women beach cover up resort wear",
      },
      {
        name: "Skincare travel bottles",
        note: "Keeps favorite products packed cleanly without carrying full sizes.",
        search: "travel size bottles for skincare",
      },
      {
        name: "Room slipper set",
        note: "A comfortable little detail for slow hotel mornings.",
        search: "women soft room slippers",
      },
      {
        name: "Luggage organizer cubes",
        note: "For separating outfits, beauty pouches, and last-minute extras.",
        search: "packing cubes travel organizer women",
      },
    ],
  },
  {
    title: "Creator Kit",
    slug: "creator-kit",
    moment: "For filming reels, mirror shots, cafe corners, and smoother content days.",
    image: ivaImages.rooftopBlue,
    imagePosition: "50% 18%",
    products: [
      {
        name: "Phone tripod",
        note: "A simple upgrade for steady reels, flatlays, and solo shooting.",
        search: "phone tripod for reels",
      },
      {
        name: "Mini LED light",
        note: "Helpful when restaurant light is moody but the shot needs clarity.",
        search: "portable led light for phone video",
      },
      {
        name: "Wireless mic",
        note: "For voiceovers, hotel room tours, and clean creator audio.",
        search: "wireless microphone for phone vlogging",
      },
      {
        name: "Phone gimbal",
        note: "For smoother walk-in shots, outfit videos, and hotel reveals.",
        search: "phone gimbal stabilizer for reels",
      },
      {
        name: "Power bank",
        note: "The quiet essential behind long shoot days and event nights.",
        search: "compact power bank fast charging",
      },
      {
        name: "Acrylic flatlay tray",
        note: "For product shots, beauty edits, and table details.",
        search: "acrylic tray for flatlay photography",
      },
    ],
  },
  {
    title: "Home Rituals",
    slug: "home-rituals",
    moment: "For slower mornings, reset evenings, editing days, and softer self-care.",
    image: ivaImages.fineDining,
    imagePosition: "50% 44%",
    products: [
      {
        name: "Scented candle",
        note: "A small mood-setter for getting ready, journaling, or editing.",
        search: "luxury scented candle jar",
      },
      {
        name: "Glass coffee tumbler",
        note: "For iced coffee, matcha, desk days, and aesthetic morning routines.",
        search: "glass tumbler with straw coffee",
      },
      {
        name: "Silk scrunchies",
        note: "A gentle everyday detail for hair, travel, and getting-ready reels.",
        search: "silk scrunchies for women",
      },
      {
        name: "Journal notebook",
        note: "For content ideas, cafe notes, and small reset lists.",
        search: "aesthetic journal notebook women",
      },
      {
        name: "Desk mirror",
        note: "A simple getting-ready piece for makeup and quiet mornings.",
        search: "aesthetic desk mirror makeup",
      },
      {
        name: "Soft throw blanket",
        note: "For editing days, home coffee, and a warmer room mood.",
        search: "soft throw blanket aesthetic",
      },
    ],
  },
  {
    title: "Event Night Edit",
    slug: "event-night-edit",
    moment: "For launches, concerts, dinner invites, and polished after-dark plans.",
    image: ivaImages.rooftopBar,
    imagePosition: "50% 18%",
    products: [
      {
        name: "Statement earrings",
        note: "The quickest way to make a simple evening look feel styled.",
        search: "statement earrings women party",
      },
      {
        name: "Evening clutch",
        note: "Small, structured, and easy for dinners or brand events.",
        search: "women evening clutch bag",
      },
      {
        name: "Heel cushions",
        note: "A practical secret for longer event nights.",
        search: "heel cushion pads for women",
      },
      {
        name: "Body shimmer",
        note: "A soft glow detail for sleeveless dresses and night shoots.",
        search: "body shimmer lotion women",
      },
      {
        name: "Fashion tape",
        note: "For cleaner necklines, saree pleats, and last-minute fixes.",
        search: "fashion tape for women clothing",
      },
      {
        name: "Mini lint roller",
        note: "A tiny bag essential before photos and arrivals.",
        search: "mini lint roller travel",
      },
    ],
  },
  {
    title: "Monsoon Cafe Kit",
    slug: "monsoon-cafe-kit",
    moment: "For rainy coffee plans, cozy corners, and Bengaluru's softer weather days.",
    image: ivaImages.fineDining,
    imagePosition: "50% 44%",
    products: [
      {
        name: "Compact umbrella",
        note: "Small enough for a tote, useful for sudden city rain.",
        search: "compact umbrella for women",
      },
      {
        name: "Waterproof tote",
        note: "For carrying cafe-day essentials without worrying about drizzle.",
        search: "waterproof tote bag women",
      },
      {
        name: "Light cardigan",
        note: "A soft layer for cool cafes and evening weather.",
        search: "women light cardigan neutral",
      },
      {
        name: "Cream blush",
        note: "Fresh, easy color that still looks soft in cloudy light.",
        search: "cream blush for women",
      },
      {
        name: "Hair serum",
        note: "For smoother hair on humid or rainy days.",
        search: "anti frizz hair serum women",
      },
      {
        name: "Waterproof mascara",
        note: "A sensible pick for rain, long days, and emotional movies.",
        search: "waterproof mascara women",
      },
    ],
  },
  {
    title: "Festive Saree Details",
    slug: "festive-saree-details",
    moment: "For Bengali celebrations, wedding invites, heritage stays, and dressed-up family evenings.",
    image: ivaImages.heritageSaree,
    imagePosition: "50% 12%",
    products: [
      {
        name: "Pearl earrings",
        note: "A classic detail for sarees, soft glam, and family occasions.",
        search: "pearl earrings women ethnic",
      },
      {
        name: "Bindi set",
        note: "A tiny detail that completes a traditional look.",
        search: "bindi set for women",
      },
      {
        name: "Saree shapewear",
        note: "A smooth base for longer festive days.",
        search: "saree shapewear women",
      },
      {
        name: "Potli bag",
        note: "Pretty enough for festive photos, useful enough for essentials.",
        search: "potli bag women ethnic",
      },
      {
        name: "Hair bun pins",
        note: "For clean buns, flowers, and traditional styling.",
        search: "hair bun pins women",
      },
      {
        name: "Gold bangles",
        note: "A warm finishing touch for saree and kurta looks.",
        search: "gold plated bangles women",
      },
    ],
  },
];

export function makeAmazonAffiliateUrl(search: string) {
  const params = new URLSearchParams({ k: search });

  if (!amazonAffiliate.tag.includes("replace-with")) {
    params.set("tag", amazonAffiliate.tag);
  }

  return `${amazonAffiliate.baseUrl}?${params.toString()}`;
}

export const topContent = [
  {
    title: "The Bear House Shopping Day",
    city: "Bengaluru",
    category: "Fashion",
    views: "319K",
    image: ivaImages.bearHouseRetail,
    href: "https://www.instagram.com/reel/DYEM8CpxKdj",
  },
  {
    title: "Marriott Rooftop Evening",
    city: "Bengaluru",
    category: "Rooftop",
    views: "141K",
    image: ivaImages.rooftopBar,
    href: "https://www.instagram.com/reel/DXf_JOMEQlB",
  },
  {
    title: "Hilton Poolside Staycation",
    city: "Bengaluru",
    category: "Staycation",
    views: "102K",
    image: ivaImages.rooftopPool,
    href: "https://www.instagram.com/reel/DW6CUOaEX4t",
  },
];

export const trustedBrands = [
  {
    name: "Amazon",
    focus: "Fashion & lifestyle",
    metric: "Global consumer giant",
  },
  {
    name: "Air India",
    focus: "Travel campaigns",
    metric: "Trusted airline brand",
  },
  {
    name: "Hilton",
    focus: "Luxury stays",
    metric: "Premium hospitality leader",
  },
  {
    name: "Hilton Manyata",
    focus: "Dining & hospitality",
    metric: "Recent hotel and dining story",
  },
  {
    name: "Hyatt Centric",
    focus: "Staycations",
    metric: "Modern luxury positioning",
  },
  {
    name: "Sheraton",
    focus: "Hotel collabs",
    metric: "International hotel reputation",
  },
  {
    name: "JW Marriott",
    focus: "Luxury dining",
    metric: "Elite hospitality image",
  },
  {
    name: "Maybelline",
    focus: "Beauty launches",
    metric: "Globally loved makeup",
  },
  {
    name: "Estee Lauder",
    focus: "Premium beauty",
    metric: "Personalized beauty experience",
  },
  {
    name: "Sephora",
    focus: "Beauty retail",
    metric: "Phoenix Marketcity Bangalore activation",
  },
  {
    name: "Bioderma",
    focus: "Sensitive skincare",
    metric: "Dermatologist trusted skincare",
  },
  {
    name: "CeraVe",
    focus: "Hydration skincare",
    metric: "Science backed skincare",
  },
  {
    name: "Garnier",
    focus: "Face care",
    metric: "Mass market beauty",
  },
  {
    name: "Colgate",
    focus: "Oral care",
    metric: "Trusted household essential",
  },
  {
    name: "Pond's",
    focus: "Daily skincare",
    metric: "Legacy beauty brand",
  },
  {
    name: "Palmolive",
    focus: "Body care",
    metric: "Everyday personal care",
  },
  {
    name: "Pizza Hut",
    focus: "Food collabs",
    metric: "Globally recognized chain",
  },
  {
    name: "Swiggy",
    focus: "Lifestyle campaigns",
    metric: "Leading delivery platform",
  },
  {
    name: "Michael Kors",
    focus: "Fashion launch",
    metric: "New collection event signal",
  },
  {
    name: "Hair Masters",
    focus: "Salon & self-care",
    metric: "Luxury salon collaboration",
  },
  {
    name: "The Bier Library",
    focus: "Food & nightlife",
    metric: "Bengaluru weekend plan",
  },
  {
    name: "Tipsy Bull",
    focus: "Bengaluru nightlife",
    metric: "Multi-outlet bar story",
  },
  {
    name: "Nandhana Palace",
    focus: "Food discovery",
    metric: "Bengaluru dining story",
  },
  {
    name: "Long Boat Brewing Co.",
    focus: "Brewery experience",
    metric: "Food and ambience reel",
  },
  {
    name: "Sanfe",
    focus: "Beauty & personal care",
    metric: "Creator product story",
  },
  {
    name: "Pee Safe",
    focus: "Personal care",
    metric: "Concert lifestyle integration",
  },
  {
    name: "WOW",
    focus: "Haircare & skincare",
    metric: "Popular wellness brand",
  },
  {
    name: "Zouk",
    focus: "Bags & fashion",
    metric: "Modern Indian lifestyle",
  },
  {
    name: "Nutriorg",
    focus: "Wellness products",
    metric: "Natural wellness leader",
  },
  {
    name: "Fixderma",
    focus: "Derm skincare",
    metric: "Trusted skin solutions",
  }
];

export const visualStories = [
  {
    title: "Heritage Saree Check-in",
    category: "Cultural Luxury",
    mood: "A heritage stay, a saree moment, and an arrival that feels special.",
    format: "Stories + Reel",
    signal: "Save-worthy stay",
    image: ivaImages.heritageSaree,
  },
  {
    title: "Poolside Golden Hour",
    category: "Staycation",
    mood: "Poolside light, soft glam, and a weekend people can imagine booking.",
    format: "Reel Storyline",
    signal: "Couple escape",
    image: ivaImages.poolsidePink,
  },
  {
    title: "Saree Editorial Drop",
    category: "Elevated Fashion",
    mood: "Indianwear, soft portraits, and a quietly dressed-up mood.",
    format: "Photo Set",
    signal: "Fashion cue",
    image: ivaImages.editorialSaree,
  },
  {
    title: "Retail Fit Check",
    category: "Premium Retail",
    mood: "A shopping day that feels styled, easy, and best-friend honest.",
    format: "Try-on Reel",
    signal: "319K loved reel",
    image: ivaImages.bearHouseRetail,
  },
  {
    title: "Rooftop After Dark",
    category: "Nightlife",
    mood: "City lights, blue-hour drinks, and a table people want to share.",
    format: "Night Reel",
    signal: "Date-night save",
    image: ivaImages.rooftopBar,
  },
  {
    title: "Chef Table Close-up",
    category: "Hospitality",
    mood: "Chef moments, plating details, and a table that feels worth choosing.",
    format: "Dining Edit",
    signal: "Luxury dining",
    image: ivaImages.hiltonChef,
  },
  {
    title: "Blue Hour Couple Plan",
    category: "Couple Experience",
    mood: "A dressed-up skyline moment made for two.",
    format: "Mini Guide",
    signal: "Bengaluru mood",
    image: ivaImages.rooftopBlue,
  },
  {
    title: "Hotel Arrival Moment",
    category: "Boutique Stay",
    mood: "A polished check-in, beautiful details, and the start of a staycation.",
    format: "Story Set",
    signal: "Stay partner",
    image: ivaImages.doubletreeArrival,
  },
  {
    title: "Pink Café Ritual",
    category: "Luxury Café",
    mood: "Pretty tables, playful color, and the café mood Gen Z saves.",
    format: "Cafe Reel",
    signal: "Aesthetic find",
    image: ivaImages.pinkCafe,
  },
  {
    title: "Fine Dining Details",
    category: "Premium Dining",
    mood: "Quiet table styling, beautiful plating, and a slower evening.",
    format: "Table Story",
    signal: "Premium menu",
    image: ivaImages.fineDining,
  },
];

export const demographics = {
  age: [
    { label: "13-17", value: 30.8 },
    { label: "18-24", value: 41.5 },
    { label: "25-34", value: 19.7 },
    { label: "35-44", value: 5.2 },
    { label: "45-54", value: 1.6 },
    { label: "55-64", value: 0.5 },
    { label: "65+", value: 0.8 },
  ],
  gender: [
    { label: "Men", value: 75.4 },
    { label: "Women", value: 24.6 },
  ],
  geography: [
    { label: "India", value: 96.8 },
    { label: "United States", value: 0.6 },
    { label: "United Arab Emirates", value: 0.3 },
    { label: "United Kingdom", value: 0.3 },
  ],
  content: [
    { label: "Reels", value: 48.3, note: "Discovery Engine" },
    { label: "Stories", value: 46.4, note: "Community Retention" },
    { label: "Posts", value: 5.3, note: "Evergreen Proof" },
  ],
};

export const mediaKit = {
  reportingWindow: "20 Apr - 19 May",
  dashboardWindow: "19 Apr - 18 May",
  source: "Instagram professional dashboard, last 30 days",
  insights: [
    { label: "Views", value: "179.3K", note: "Top-of-funnel attention" },
    { label: "Interactions", value: "36.5K", note: "Audience actions" },
    { label: "Content shared", value: "107", note: "Always-on output" },
  ],
  bengaluruSignal: [
    { label: "Bengaluru", value: "1.3%", note: "Home-city signal" },
    { label: "Delhi", value: "1.7%", note: "North India reach" },
    { label: "Kolkata", value: "1.1%", note: "Cultural connection" },
    { label: "Mumbai", value: "0.8%", note: "Premium market overlap" },
  ],
  profileActivity: [
    { label: "Profile activity", value: "4,115", note: "+13.0%" },
    { label: "Profile visits", value: "4,082", note: "+12.5%" },
  ],
  audience: {
    age: demographics.age,
    gender: demographics.gender,
    topCities: [
      { label: "Delhi", value: 1.7 },
      { label: "Bengaluru", value: 1.3 },
      { label: "Kolkata", value: 1.1 },
      { label: "Mumbai", value: 0.8 },
      { label: "Jahangirpur", value: 0.6 },
    ],
    topCountries: demographics.geography,
  },
  performanceProof: [
    {
      title: "The Bear House shopping day",
      value: "319K",
      note: "Fashion retail reel",
      image: ivaImages.bearHouseRetail,
    },
    {
      title: "Rooftop evening",
      value: "142K",
      note: "Hospitality and nightlife",
      image: ivaImages.rooftopBar,
    },
    {
      title: "Poolside staycation",
      value: "86K",
      note: "Hotel and experience story",
      image: ivaImages.rooftopPool,
    },
  ],
  whyBrandsCare: [
    {
      title: "She sells the mood first",
      text: "Iva makes a place or product feel easy to imagine, not forced. That is why her content works for cafes, hotels, fashion, beauty, and city plans.",
    },
    {
      title: "Strong young India audience",
      text: "The audience is led by 13-24 and 25-34 viewers, with India as the clear core market. Useful for brands that want aspirational urban attention.",
    },
    {
      title: "Content volume plus taste",
      text: "107 pieces shared in the latest dashboard window gives brands enough consistency without losing the curated, personal feel.",
    },
  ],
  brandFit: [
    "Boutique hotels, staycations, and room reveals",
    "Cafes, rooftops, restaurants, and weekend plans",
    "Salon, beauty, skincare, and personal-care launches",
    "Fashion, retail visits, events, concerts, and branded content",
  ],
  collaborationMenu: [
    {
      title: "Save-worthy Reel",
      text: "A short experience story with arrival, outfit, details, product or place, and one clear reason to save.",
    },
    {
      title: "Launch Story Set",
      text: "Fast, warm, direct story coverage for openings, drops, menus, trials, rooms, and limited-time offers.",
    },
    {
      title: "Creator Visit Package",
      text: "A full visit built for awareness: reel, stories, stills, and a simple CTA that feels natural.",
    },
  ],
  partnershipAngles: [
    {
      title: "Make the place feel desirable",
      label: "Hospitality",
      text: "Arrival frames, room details, table stories, skyline light, and the small reasons someone saves a stay or dinner plan.",
    },
    {
      title: "Make the product feel wearable",
      label: "Fashion & Beauty",
      text: "Soft glam, outfit context, try-on energy, skin-first beauty, and real-life styling that feels aspirational but close.",
    },
    {
      title: "Make the launch feel like a moment",
      label: "Events & Culture",
      text: "Openings, drops, concerts, previews, menus, and hosted experiences shaped into quick stories people understand immediately.",
    },
  ],
  profileSnapshot: [
    { label: "Profile", value: instagramProfile.displayName },
    { label: "Category", value: instagramProfile.category },
    { label: "Bio", value: instagramProfile.profileLine },
    { label: "Collab route", value: instagramProfile.collaborationCta },
  ],
  collaborationHighlights: instagramProfile.collaborationHighlights,
  brandPromise: [
    "Premium creator presentation",
    "Warm personal storytelling",
    "Save-first city recommendations",
    "Luxury without hard-selling",
  ],
};

export const collaborationTypes = [
  "Beauty launches",
  "Food and cafe stories",
  "Travel and staycations",
  "Lifestyle products",
  "Salon and self-care",
  "Fashion labels",
  "Concerts and events",
  "Furniture and home",
];

export const experiencePillars = [
  "Beauty rituals",
  "Food discoveries",
  "Travel diaries",
  "Lifestyle edits",
  "Beautiful cafés",
  "Rooftop experiences",
  "Boutique hospitality",
  "Elegant staycations",
  "Fashion moments",
  "Salon days",
  "Bengali cultural notes",
  "Bangalore city culture",
];

export const neighborhoods = [
  {
    slug: "indiranagar",
    name: "Indiranagar",
    title: "Iva's Indiranagar Evening",
    description:
      "Cafés, dinner tables, and rooftops for an easy, beautiful evening.",
    keywords: [
      "Indiranagar luxury cafés",
      "Indiranagar premium experiences",
      "hidden luxury cafés Bangalore",
    ],
  },
  {
    slug: "koramangala",
    name: "Koramangala",
    title: "Iva's Koramangala Picks",
    description:
      "Modern cafés, dinner plans, and weekend energy without the noise.",
    keywords: [
      "Koramangala luxury cafés",
      "Koramangala premium cafés",
      "Bangalore couple experiences",
    ],
  },
  {
    slug: "hsr",
    name: "HSR",
    title: "Iva's HSR Discoveries",
    description:
      "Calm cafés, brunch tables, and neighborhood places worth saving.",
    keywords: ["HSR premium cafés", "HSR hidden cafés", "Bangalore premium experiences"],
  },
  {
    slug: "mg-road",
    name: "MG Road",
    title: "Iva's MG Road Notes",
    description:
      "Old-city texture, polished evenings, and classic Bengaluru charm.",
    keywords: ["MG Road luxury cafés", "Bangalore luxury experiences"],
  },
];

export const editorial = [
  {
    slug: "bengaluru-rooftop-culture",
    title: "Bengaluru Looks Better From A Rooftop",
    category: "Bengaluru Guide",
    readTime: "4 min read",
    date: "May 2026",
    excerpt:
      "Rooftop nights, dressed-up plans, and the Bengaluru glow Iva keeps coming back to.",
    image: ivaImages.rooftopBar,
    keywords: [
      "Bengaluru rooftop cafes",
      "Bangalore couple experiences",
      "Bangalore premium experiences",
    ],
    body: [
      {
        heading: "The city looks different from a rooftop.",
        paragraphs: [
          "A good rooftop is not just a view. It is soft light, a beautiful table, a polished drink, and enough space to feel away from the city for a while.",
          "For Iva’s audience, a rooftop is a simple modern ritual: dress up, arrive at golden hour, take the city in, and save the place for the next plan.",
        ],
      },
      {
        heading: "What makes a rooftop worth featuring?",
        paragraphs: [
          "The small details matter most: the first arrival frame, the glow on the table, the plate, the glass, and the moment the city turns dark.",
          "When a space has feeling, Iva does not need to over-explain it. The mood does the work.",
        ],
      },
    ],
  },
  {
    slug: "goa-slow-luxury",
    title: "The Softer Side Of Goa",
    category: "Goa Escapes",
    readTime: "3 min read",
    date: "May 2026",
    excerpt:
      "Boutique stays, golden-hour dining, and the quieter version of coastal style.",
    image: ivaImages.poolsidePink,
    keywords: ["premium Goa staycation", "Goa boutique stays"],
    body: [
      {
        heading: "Luxury Goa is slower, quieter, and more designed.",
        paragraphs: [
          "The most elegant Goa moments are quieter: a boutique check-in, a linen breakfast, a poolside hour, a sunset table, and a day that feels beautifully paced.",
          "That is where Iva’s Goa stories feel strongest. They give a stay room to breathe, without making it feel generic.",
        ],
      },
      {
        heading: "The right collaboration mood.",
        paragraphs: [
          "Goa works best for stays, slow plans, couple escapes, resort dining, and cinematic property moments. The goal is simple: make the right people want to be there.",
        ],
      },
    ],
  },
  {
    slug: "premium-cafe-language",
    title: "What Makes A Café Worth Saving",
    category: "Café Notes",
    readTime: "5 min read",
    date: "May 2026",
    excerpt:
      "Light, texture, plating, and why some cafés stay in people’s minds.",
    image: ivaImages.pinkCafe,
    keywords: [
      "Bengaluru luxury cafés",
      "hidden luxury cafés Bangalore",
      "premium cafe experiences",
    ],
    body: [
      {
        heading: "Beautiful is a sequence, not a price point.",
        paragraphs: [
          "A café is felt before the menu is read. It begins with the entrance, the light, the table, the plateware, and the space between people.",
          "These details make a recommendation feel real. The audience is not only asking where to go. They are asking if the place will make their day feel better.",
        ],
      },
      {
        heading: "How Iva makes a café feel desirable.",
        paragraphs: [
          "The strongest café stories balance mood with usefulness. People want the feeling, but they also want to know when to go, what to order, and who to take.",
          "That is the difference between a pretty post and a place people remember.",
        ],
      },
    ],
  },
  {
    slug: "indiranagar-evening-edit",
    title: "An Indiranagar Evening For Two",
    category: "Bengaluru Neighborhoods",
    readTime: "4 min read",
    date: "May 2026",
    excerpt:
      "A couple-experience route through polished cafés, rooftop energy, and after-dark city texture.",
    image: ivaImages.fineDining,
    keywords: [
      "Indiranagar premium experiences",
      "Indiranagar luxury cafés",
      "Bangalore couple experiences",
    ],
    body: [
      {
        heading: "Indiranagar works best as an evening mood.",
        paragraphs: [
          "Indiranagar has polish, movement, and enough places to turn one evening into a full plan. Coffee, dinner, a rooftop, or dessert can all belong in the same story.",
          "That helps a brand feel like part of real life, not just one more recommendation.",
        ],
      },
      {
        heading: "What feels natural here.",
        paragraphs: [
          "Beautiful cafés, new menus, cocktail-forward restaurants, fashion pop-ups, and boutique retail moments all fit when they are shared with taste.",
        ],
      },
    ],
  },
  {
    slug: "staycation-visual-checklist",
    title: "How Iva Shares A Staycation",
    category: "Stay Notes",
    readTime: "6 min read",
    date: "May 2026",
    excerpt:
      "What makes a hotel stay feel beautiful, useful, and worth booking.",
    image: ivaImages.doubletreeArrival,
    keywords: [
      "luxury staycation Bangalore",
      "boutique hotel creator stories",
      "premium hospitality experiences",
    ],
    body: [
      {
        heading: "A staycation story starts before the camera opens.",
        paragraphs: [
          "A stay begins before the room reveal. The arrival, the light, the table, the pool, the breakfast, and the first quiet moment all shape the feeling.",
          "When a hotel already has care and atmosphere, Iva can turn those details into a story people can imagine for themselves.",
        ],
      },
      {
        heading: "The ideal story flow.",
        paragraphs: [
          "Arrival, room reveal, property details, dining, a lifestyle moment, golden-hour light, and one clear reason to save the stay.",
        ],
      },
    ],
  },
  {
    slug: "why-beautiful-brands-need-creator-stories",
    title: "Why Beautiful Brands Need Real Stories",
    category: "Brand Notes",
    readTime: "5 min read",
    date: "May 2026",
    excerpt:
      "Why warm, personal storytelling helps a place or product feel chosen.",
    image: ivaImages.hiltonChef,
    keywords: [
      "premium creator collaborations India",
      "luxury lifestyle creator",
      "Bengaluru lifestyle creator",
    ],
    body: [
      {
        heading: "Promotion is easy to ignore. A real story is easier to trust.",
        paragraphs: [
          "People scroll past ads, but they pause for a real moment. A beautiful brand needs context, taste, and a voice people already trust.",
          "For Iva, every collaboration should feel like it belongs in her world: cafés, rooftops, stays, fashion, beauty, and city nights.",
        ],
      },
      {
        heading: "The personal creator advantage.",
        paragraphs: [
          "A strong story helps people understand when to visit, who to go with, what to wear, and why the experience deserves a place in their plans.",
        ],
      },
    ],
  },
];

export function makeMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = "/opengraph-image",
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  const fullTitle = `${title} | ${creator.name}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "Iva Chatterjee",
      "Luxury Lifestyle Creator",
      "Bengaluru Luxury Creator",
      "High-end Lifestyle Influencer",
      "Premium Brand Collaborations",
      "Luxury Beauty Creator",
      "Boutique Hospitality Influencer",
      ...keywords,
    ],
    authors: [{ name: creator.name }],
    creator: creator.name,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: creator.name,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: creator.handle,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
