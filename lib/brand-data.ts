import type { Metadata } from "next";

export const siteUrl = "https://iva.manojmukherjee.co.in";

export const creator = {
  name: "Iva Chatterjee",
  handle: "@iva_mana5",
  title: "Bengaluru-Based Lifestyle & Experience Creator",
  positioning: "Sharing Bengaluru's most beautiful lifestyle moments.",
  description:
    "Iva shares her personal world of Bengaluru rooftops, refined cafés, boutique stays, fashion-led evenings, and polished city rituals.",
  location: "Bengaluru, India",
  email: "ivachatterjee5@gmail.com",
  instagramUrl: "https://www.instagram.com/iva_mana5/",
  youtubeUrl: "https://www.youtube.com/@Maniva777",
  facebookPageUrl: "https://www.facebook.com/maniva777",
  websiteUrl: "https://maniva.co.in",
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
  { label: "Bengaluru", href: "/bengaluru-guide" },
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
      "Rooftop evenings, polished cafés, boutique hospitality, and the city moments Iva genuinely loves sharing.",
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
      "Boutique stays, unhurried resort days, sunset tables, and softer coastal moments from Iva's travel diary.",
    image: ivaImages.poolsidePink,
    keywords: ["premium Goa staycation", "Goa boutique stays"],
  },
  {
    name: "Mumbai",
    href: "/mumbai-experiences",
    role: "City Energy",
    positioning:
      "Fashion-forward hospitality, elevated cafés, and a sharper city mood for select collaborations.",
    image: ivaImages.rooftopBlue,
    keywords: ["Mumbai luxury cafés", "Mumbai premium hospitality"],
  },
  {
    name: "Pune",
    href: "/pune-discoveries",
    role: "Quiet Discoveries",
    positioning:
      "Calm cafés, thoughtful menus, and understated discoveries for softer weekend plans.",
    image: ivaImages.pinkCafe,
    keywords: ["Pune hidden cafés", "Pune cafés"],
  },
  {
    name: "Kolkata",
    href: "/premium-experiences#kolkata",
    role: "Selective Heritage",
    positioning:
      "Heritage stays, cultural dining, and artistic travel stories when the experience feels right for Iva's audience.",
    image: ivaImages.heritageSaree,
    keywords: ["Kolkata heritage luxury", "Kolkata boutique experiences"],
  },
];

export const stats = [
  { label: "Instagram", value: "50K+", note: "Followers" },
  { label: "YouTube", value: "16K+", note: "Maniva channel" },
  { label: "Loved Reel", value: "179K", note: "Highest reach" },
  { label: "Profile Activity", value: "+68.5%", note: "Growing interest" },
];

export const topContent = [
  {
    title: "The Bear House Shopping Day",
    city: "Bengaluru",
    category: "Fashion",
    views: "179K",
    image: ivaImages.bearHouseRetail,
  },
  {
    title: "Nazaara Rooftop Evening",
    city: "Bengaluru",
    category: "Rooftop",
    views: "141K",
    image: ivaImages.rooftopBar,
  },
  {
    title: "Poolside Staycation Moment",
    city: "Bengaluru",
    category: "Staycation",
    views: "102K",
    image: ivaImages.rooftopPool,
  },
];

export const visualStories = [
  {
    title: "Heritage Saree Check-in",
    category: "Cultural Luxury",
    mood: "Old-world service, modern styling, warm arrival frames.",
    format: "Carousel + Reel",
    signal: "Save-worthy stay",
    image: ivaImages.heritageSaree,
  },
  {
    title: "Poolside Golden Hour",
    category: "Staycation",
    mood: "Resort light, soft glam, and a weekend plan that feels easy to book.",
    format: "Reel Storyline",
    signal: "Couple escape",
    image: ivaImages.poolsidePink,
  },
  {
    title: "Saree Editorial Drop",
    category: "Elevated Fashion",
    mood: "Polished Indianwear with creator-first portrait energy.",
    format: "Photo Set",
    signal: "Fashion cue",
    image: ivaImages.editorialSaree,
  },
  {
    title: "Retail Fit Check",
    category: "Premium Retail",
    mood: "A shopping day styled like a best-friend recommendation.",
    format: "Try-on Reel",
    signal: "179K loved reel",
    image: ivaImages.bearHouseRetail,
  },
  {
    title: "Rooftop After Dark",
    category: "Nightlife",
    mood: "Blue-hour cocktails, city lights, and a table people want to send.",
    format: "Night Reel",
    signal: "Date-night save",
    image: ivaImages.rooftopBar,
  },
  {
    title: "Chef Table Close-up",
    category: "Hospitality",
    mood: "Menu details, chef moments, and the trust signals behind a premium table.",
    format: "Dining Edit",
    signal: "Luxury dining",
    image: ivaImages.hiltonChef,
  },
  {
    title: "Blue Hour Couple Plan",
    category: "Couple Experience",
    mood: "Soft city skyline, dressed-up energy, and a plan built for two.",
    format: "Mini Guide",
    signal: "Bengaluru mood",
    image: ivaImages.rooftopBlue,
  },
  {
    title: "Hotel Arrival Moment",
    category: "Boutique Stay",
    mood: "Lobby details, check-in polish, and the first frame of a staycation.",
    format: "Story Set",
    signal: "Stay partner",
    image: ivaImages.doubletreeArrival,
  },
  {
    title: "Pink Café Ritual",
    category: "Luxury Café",
    mood: "Pretty tables, playful color, and the kind of café Gen Z saves fast.",
    format: "Cafe Reel",
    signal: "Aesthetic find",
    image: ivaImages.pinkCafe,
  },
  {
    title: "Fine Dining Details",
    category: "Premium Dining",
    mood: "Table styling, plating, and quiet luxury for slower evenings.",
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
      "A polished route through cafés, dinner tables, and after-dark rooftops for an easy, beautiful Bengaluru evening.",
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
      "Modern dining, café culture, and boutique retail energy without the usual weekend noise.",
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
      "A softer side of Bengaluru: calm cafés, brunch tables, and neighborhood spaces worth saving.",
    keywords: ["HSR premium cafés", "HSR hidden cafés", "Bangalore premium experiences"],
  },
  {
    slug: "mg-road",
    name: "MG Road",
    title: "Iva's MG Road Notes",
    description:
      "Heritage-adjacent hospitality, old-city texture, and polished evenings in the heart of Bengaluru.",
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
      "Why Iva keeps returning to rooftops for date nights, celebrations, and that beautiful Bengaluru evening glow.",
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
          "Bengaluru rooftop evenings are not only about height or skyline. The best spaces create a little pause inside a fast-moving city: soft lighting, a beautiful table, a polished bar, and enough distance for a couple or small group to feel private.",
          "For Iva’s audience, the rooftop is a modern ritual. It feels special without becoming loud, polished without feeling cold, and full of city energy without losing elegance.",
        ],
      },
      {
        heading: "What makes a rooftop worth featuring?",
        paragraphs: [
          "A strong rooftop story needs rhythm: the first arrival frame, the glow around the table, the plate texture, the drink detail, and the transition from golden hour into night. These are the moments that make a place feel beautiful on camera.",
          "When a space already has atmosphere, service, and thoughtful details, Iva does not need to over-explain it. The feeling comes through naturally.",
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
          "The most elegant version of Goa is not crowded beach content. It is a boutique check-in, a linen breakfast, a poolside hour, a sunset table, and the feeling that the day has been edited with taste.",
          "This is where Iva’s Goa stories feel strongest for boutique stays and hospitality brands: they can hold silence, texture, and aspiration without slipping into generic travel language.",
        ],
      },
      {
        heading: "The right collaboration mood.",
        paragraphs: [
          "Goa collaborations feel most natural around stays, slow-living plans, couple escapes, resort dining, and cinematic property moments. The goal is not to show everything. The goal is to make the right audience want to enter that world.",
        ],
      },
    ],
  },
  {
    slug: "premium-cafe-language",
    title: "What Makes A Café Worth Saving",
    category: "Experience Strategy",
    readTime: "5 min read",
    date: "May 2026",
    excerpt:
      "Light, texture, plating, service rhythm, and why some cafés become part of a city’s lifestyle memory.",
    image: ivaImages.pinkCafe,
    keywords: [
      "Bengaluru luxury cafés",
      "hidden luxury cafés Bangalore",
      "premium cafe marketing",
    ],
    body: [
      {
        heading: "Beautiful is a sequence, not a price point.",
        paragraphs: [
          "A café is felt before the menu is read. It begins with the entrance, the lighting temperature, the table material, the plateware, the way staff move, and the amount of breathing room between guests.",
          "For creator storytelling, these details matter because they make the recommendation believable. The audience is not only asking where to go. They are asking whether the space will make their moment feel elevated.",
        ],
      },
      {
        heading: "How Iva translates ambiance into desire.",
        paragraphs: [
          "The strongest café content balances atmosphere with usefulness. A cinematic opening frame creates aspiration, but the audience still needs to understand the mood, the occasion, the best time to visit, and why the place is worth saving.",
          "That is the difference between a post and a recommendation people remember.",
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
          "The neighborhood has enough polish to feel elevated and enough movement to feel alive. For Iva’s audience, the best Indiranagar content should not look rushed. It should move like an evening plan: coffee, a walkable transition, dinner, then a rooftop or dessert stop.",
          "This kind of storytelling helps brands sit inside a real lifestyle decision instead of appearing as a one-off recommendation.",
        ],
      },
      {
        heading: "What brands can own here.",
        paragraphs: [
          "Beautiful cafés, new menus, cocktail-forward restaurants, fashion pop-ups, and boutique retail moments all fit the Indiranagar audience when they are framed with restraint and taste.",
        ],
      },
    ],
  },
  {
    slug: "staycation-visual-checklist",
    title: "How Iva Plans A Staycation Story",
    category: "Hospitality Strategy",
    readTime: "6 min read",
    date: "May 2026",
    excerpt:
      "What boutique hotels and resort partners should prepare before a creator-led stay story.",
    image: ivaImages.doubletreeArrival,
    keywords: [
      "luxury staycation Bangalore",
      "boutique hotel creator campaign",
      "premium hospitality marketing",
    ],
    body: [
      {
        heading: "A staycation story starts before the camera opens.",
        paragraphs: [
          "The room needs a hero angle. The breakfast needs a table story. The pool or terrace needs a time of day. The entry sequence needs arrival emotion. These decisions make the final content feel considered without forcing it.",
          "Boutique hospitality brands often have beautiful spaces, but the story becomes stronger when Iva and the brand agree on the emotional arc first.",
        ],
      },
      {
        heading: "The ideal story flow.",
        paragraphs: [
          "Arrival, room reveal, property texture, signature dining, couple or lifestyle moment, golden-hour hero frame, and a clear save-worthy recommendation. This gives the audience a reason to imagine booking, not just watching.",
        ],
      },
    ],
  },
  {
    slug: "why-beautiful-brands-need-creator-stories",
    title: "Why Beautiful Brands Need Creator-Led Stories",
    category: "Brand Strategy",
    readTime: "5 min read",
    date: "May 2026",
    excerpt:
      "The shift from one-off promotion to warm, creator-led storytelling for hospitality, fashion, and lifestyle brands.",
    image: ivaImages.hiltonChef,
    keywords: [
      "premium creator marketing India",
      "luxury lifestyle creator",
      "Bengaluru lifestyle creator",
    ],
    body: [
      {
        heading: "Promotion is easy to ignore. A real story is easier to trust.",
        paragraphs: [
          "Brands need more than reach. They need context, taste, and a creator who can make an experience feel chosen. A creator-led story gives the brand a longer shelf life because it behaves like a recommendation, a guide, and a campaign asset at once.",
          "For Iva, this means every collaboration should feel like part of a larger lifestyle universe: Bengaluru rooftops, boutique stays, refined cafés, elevated fashion, and city culture.",
        ],
      },
      {
        heading: "The personal creator advantage.",
        paragraphs: [
          "A strong creator-led story can help audiences understand when to visit, who the experience is for, what mood it serves, and why it deserves attention. That is what separates a warm personal brand from a simple post-for-reach model.",
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
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    keywords: [
      "Iva Chatterjee",
      "Bengaluru lifestyle creator",
      "Bangalore premium experiences",
      ...keywords,
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Iva Chatterjee",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
