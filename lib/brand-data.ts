import type { Metadata } from "next";

export const siteUrl = "https://iva.manojmukherjee.co.in";

export const creator = {
  name: "Iva Chatterjee",
  handle: "@iva_mana5",
  title: "Luxury Lifestyle Creator",
  positioning: "Soft luxury, city nights, and places worth saving.",
  description:
    "Iva shares beautiful cafés, rooftops, boutique stays, fashion moments, and city nights through a soft luxury lens.",
  location: "Bengaluru, India",
  email: "ivachatterjee5@gmail.com",
  instagramUrl: "https://www.instagram.com/iva_mana5/",
  youtubeUrl: "https://www.youtube.com/@Maniva777",
  facebookPageUrl: "https://www.facebook.com/maniva777",
  websiteUrl: "https://iva.manojmukherjee.co.in",
  profileImage: "/iva/editorial-saree-portrait.jpeg",
  heroImage: "/iva/rooftop-blue-evening.jpeg",
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
  { label: "Instagram", value: "50K+", note: "Style-led audience" },
  { label: "YouTube", value: "16K+", note: "Maniva community" },
  { label: "Loved Reel", value: "179K", note: "Most-loved moment" },
  { label: "Profile Activity", value: "+68.5%", note: "Rising interest" },
];

export const topContent = [
  {
    title: "The Bear House Shopping Day",
    city: "Bengaluru",
    category: "Fashion",
    views: "179K",
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
    signal: "179K loved reel",
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
    { label: "18-24", value: 41.0 },
    { label: "13-17", value: 27.8 },
    { label: "25-34", value: 21.8 },
    { label: "35-44", value: 6.0 },
  ],
  gender: [
    { label: "Men", value: 75.4 },
    { label: "Women", value: 24.6 },
  ],
  geography: [
    { label: "India", value: 83.5 },
    { label: "Bangladesh", value: 6.7 },
    { label: "United States", value: 0.8 },
    { label: "Nigeria", value: 0.5 },
    { label: "Pakistan", value: 0.5 },
  ],
  content: [
    { label: "Reels", value: 48.3, note: "Discovery Engine" },
    { label: "Stories", value: 46.4, note: "Community Retention" },
    { label: "Posts", value: 5.3, note: "Evergreen Proof" },
  ],
};

export const collaborationTypes = [
  "Beautiful cafés",
  "Boutique hotels",
  "Elegant restaurants",
  "Fashion labels",
  "Skincare and beauty",
  "Lifestyle products",
  "Wellness spaces",
  "Stay and travel partners",
];

export const experiencePillars = [
  "Beautiful cafés",
  "Rooftop experiences",
  "Boutique hospitality",
  "Elegant staycations",
  "Premium brunches",
  "Modern city culture",
  "Elevated fashion",
  "Soft luxury lifestyle",
  "Couple moments",
  "Hidden city discoveries",
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
  const url = `${siteUrl}${path}`;
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

