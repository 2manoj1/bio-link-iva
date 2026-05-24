import "server-only";

import {
  amazonAffiliate,
  collaborationTypes,
  creator,
  dailyProductShelves,
  demographics,
  editorial,
  experiencePillars,
  instagramProfile,
  markets,
  mediaKit,
  neighborhoods,
  siteUrl,
  stats,
  topContent,
  trustedBrands,
  visualStories,
} from "@/lib/brand-data";

export type KnowledgeChunk = {
  id: string;
  title: string;
  source: string;
  text: string;
  tokens: Set<string>;
  phrases: string[];
  priority: number;
};

export type RetrievedChunk = Omit<KnowledgeChunk, "tokens" | "phrases" | "priority"> & {
  score: number;
};

const STOP_WORDS = new Set([
  "about",
  "after",
  "also",
  "and",
  "are",
  "ask",
  "brand",
  "can",
  "does",
  "for",
  "from",
  "give",
  "how",
  "into",
  "iva",
  "like",
  "more",
  "need",
  "please",
  "she",
  "tell",
  "that",
  "the",
  "their",
  "this",
  "want",
  "what",
  "when",
  "where",
  "who",
  "with",
  "you",
  "your",
]);

const TOKEN_ALIASES: Record<string, string[]> = {
  bangalore: ["bengaluru"],
  bengaluru: ["bangalore"],
  cafe: ["cafes", "coffee"],
  cafes: ["cafe", "coffee"],
  collaboration: ["collab", "partnership", "campaign"],
  collaborations: ["collab", "partnership", "campaign"],
  collab: ["collaboration", "partnership", "campaign"],
  contact: ["email", "reach"],
  creator: ["influencer"],
  creators: ["influencer"],
  dining: ["restaurant", "food"],
  influencer: ["creator"],
  influencers: ["creator"],
  marketing: ["campaign", "brand", "partnership"],
  partnership: ["collaboration", "collab", "campaign"],
  premium: ["luxury"],
  rate: ["pricing"],
  rates: ["pricing"],
  reel: ["reels", "video"],
  reels: ["reel", "video"],
  restaurant: ["dining", "food"],
  rooftop: ["rooftops"],
  rooftops: ["rooftop"],
  shop: ["shopping", "products"],
  shopping: ["shop", "products"],
  skincare: ["beauty"],
  salon: ["beauty", "selfcare"],
  stay: ["staycation", "hotel"],
  stays: ["staycation", "hotel"],
  staycation: ["stay", "hotel"],
  hotel: ["stay", "staycation", "hospitality"],
  hospitality: ["hotel", "staycation", "dining"],
  fashion: ["outfit", "retail"],
  outfit: ["fashion", "styling"],
  event: ["launch", "concert"],
  events: ["launch", "concert"],
  launch: ["event", "opening"],
  furniture: ["home", "lifestyle"],
  home: ["furniture", "lifestyle"],
  audience: ["followers", "demographics", "analytics"],
  followers: ["audience", "media"],
};

function tokenize(input: string) {
  const tokens = input
    .toLowerCase()
    .replace(/[^a-z0-9@.+-]+/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));

  return [...new Set(tokens.flatMap((token) => [token, ...(TOKEN_ALIASES[token] ?? [])]))];
}

function expandMultilingualQuery(query: string) {
  const hints: string[] = [];

  if (/[\u0980-\u09FF\u0900-\u097F\u0C80-\u0CFF]/.test(query)) {
    hints.push("iva bengaluru creator lifestyle premium city experiences");
  }

  if (/(হোটেল|ক্যাফে|কাফে|hotel|cafe|restaurant|होटल|कैफे|रेस्तरां|ಹೋಟೆಲ್|ಕ್ಯಾಫೆ|ರೆಸ್ಟೋರೆಂಟ್)/i.test(query)) {
    hints.push("hotel cafe restaurant hospitality food rooftop staycation content");
  }

  if (/(ব্র্যান্ড|কনটেন্ট|কন্টেন্ট|সহযোগ|brand|content|collab|campaign|ब्रांड|कंटेंट|सहयोग|ಬ್ರ್ಯಾಂಡ್|ಕಂಟೆಂಟ್|ಸಹಯೋಗ)/i.test(query)) {
    hints.push("brand collaboration campaign partnership influencer marketing content strategy");
  }

  if (/(সৌন্দর্য|ফ্যাশন|beauty|fashion|स्किन|फैशन|ಬ್ಯೂಟಿ|ಫ್ಯಾಷನ್)/i.test(query)) {
    hints.push("beauty fashion skincare salon soft glam outfit event");
  }

  return hints.join(" ");
}

function chunk(
  id: string,
  title: string,
  source: string,
  text: string,
  options: {
    aliases?: string[];
    phrases?: string[];
    priority?: number;
  } = {},
): KnowledgeChunk {
  const aliasText = options.aliases?.join(" ") ?? "";

  return {
    id,
    title,
    source,
    text,
    tokens: new Set(tokenize(`${title} ${source} ${text} ${aliasText}`)),
    phrases: options.phrases?.map((phrase) => phrase.toLowerCase()) ?? [],
    priority: options.priority ?? 1,
  };
}

function toRetrievedChunk(item: KnowledgeChunk, score: number): RetrievedChunk {
  return {
    id: item.id,
    title: item.title,
    source: item.source,
    text: item.text,
    score,
  };
}

const brandSignals = trustedBrands
  .slice(0, 24)
  .map((brand) => `${brand.name}: ${brand.focus}`)
  .join("; ");

const performanceSignals = topContent
  .slice(0, 6)
  .map((item) => `${item.title} (${item.category}, ${item.views})`)
  .join("; ");

const performanceProofSignals = mediaKit.performanceProof
  .map((item) => `${item.title}: ${item.value} views, ${item.note}`)
  .join("; ");

const recentBrandSignals = instagramProfile.recentCollaborationSignals
  .map((item) => item)
  .join("; ");

const collaborationHighlights = instagramProfile.collaborationHighlights.join("; ");

const storySignals = visualStories
  .slice(0, 10)
  .map((story) => `${story.title}: ${story.category}; ${story.mood}; format ${story.format}; signal ${story.signal}`)
  .join("; ");

const marketSignals = markets
  .map((market) => `${market.name}: ${market.positioning}`)
  .join("; ");

const bengaluruMarket = markets.find((market) => market.name === "Bengaluru");

const bengaluruSignals = [
  bengaluruMarket
    ? `${bengaluruMarket.name}: ${bengaluruMarket.positioning} Keywords: ${bengaluruMarket.keywords.join(", ")}.`
    : "",
  `Neighborhoods: ${neighborhoods.map((item) => `${item.name} - ${item.description}`).join("; ")}.`,
  "Iva's Bengaluru point of view is premium but useful: rooftops, cafés, boutique stays, date-night plans, fashion-led events, food discoveries, and save-worthy city experiences.",
].filter(Boolean).join(" ");

const editorialSignals = editorial.map((item) =>
  chunk(
    `editorial-${item.slug}`,
    item.title,
    `site:editorial.${item.slug}`,
    [
      `${item.category}. ${item.excerpt}`,
      `Keywords: ${item.keywords.join(", ")}.`,
      ...item.body.flatMap((section) => [
        section.heading,
        ...section.paragraphs,
      ]),
    ].join(" "),
    {
      aliases: [item.category, ...item.keywords],
      priority: item.category.includes("Bengaluru") ? 1.18 : 1,
    },
  ),
);

const shopSignals = dailyProductShelves
  .map(
    (shelf) =>
      `${shelf.title}: ${shelf.moment} Picks include ${shelf.products
        .slice(0, 4)
        .map((product) => `${product.name} (${product.note})`)
        .join(", ")}.`,
  )
  .join(" ");

const shopQuickLinkSignals = dailyProductShelves
  .map(
    (shelf) =>
      `${shelf.title}: ${shelf.moment} Full shelf ideas: ${shelf.products
        .map((product) => `${product.name} - ${product.note}`)
        .join("; ")}`,
  )
  .join(" ");

const audienceFormatSignals = [
  `Content format split: ${demographics.content.map((item) => `${item.label} ${item.value}% (${item.note})`).join(", ")}.`,
  `Dashboard window: ${mediaKit.dashboardWindow}; source: ${mediaKit.source}.`,
  `Bengaluru/home-city signals: ${mediaKit.bengaluruSignal.map((item) => `${item.label} ${item.value}% ${item.note}`).join(", ")}.`,
  `Profile activity: ${mediaKit.profileActivity.map((item) => `${item.label} ${item.value} (${item.note})`).join(", ")}.`,
].join(" ");

const profileSnapshotSignals = [
  `Display profile: ${instagramProfile.displayName}.`,
  `Category: ${instagramProfile.category}.`,
  `Bio line: ${instagramProfile.profileLine}.`,
  `Location: ${instagramProfile.location}; identity note: ${instagramProfile.identity}.`,
  `Collaboration CTA: ${instagramProfile.collaborationCta}.`,
  `Core pillars: ${instagramProfile.contentPillars.join(", ")}.`,
].join(" ");

const neighborhoodSignals = neighborhoods
  .map(
    (item) =>
      `${item.name}: ${item.title}. ${item.description} Keywords: ${item.keywords.join(", ")}.`,
  )
  .join(" ");

// Built once per server instance. Retrieval reads this immutable in-memory index.
export const KNOWLEDGE_BASE = [
  chunk(
    "profile",
    "Iva profile",
    "site:brand-data.creator",
    `${creator.name} is ${creator.title} based in ${creator.location}. ${creator.description} Website: ${siteUrl}. Handle: ${creator.handle}.`,
    {
      aliases: [
        "who is Iva",
        "about Iva",
        "Iva Chatterjee",
        "Bangalore influencer",
        "Bengaluru influencer",
        "digital creator",
      ],
      phrases: ["who is iva", "about iva", "tell me about iva"],
      priority: 1.35,
    },
  ),
  chunk(
    "profile-snapshot",
    "Public profile snapshot and creator identity",
    "site:brand-data.instagramProfile",
    `${profileSnapshotSignals} Use this for questions about Iva's public Instagram identity, creator category, profile bio, location, and core content pillars. Do not invent personal details beyond this public profile context.`,
    {
      aliases: [
        "instagram bio",
        "profile snapshot",
        "public profile",
        "creator category",
        "iva_mana5",
        "Bong creator",
      ],
      phrases: ["instagram profile", "profile bio", "public profile"],
      priority: 1.16,
    },
  ),
  chunk(
    "content-pillars",
    "Content creation and lifestyle pillars",
    "site:brand-data.experiencePillars",
    `Iva covers ${experiencePillars.join(", ")}. Her positioning is ${creator.positioning}. Her tone is polished, warm, personal, and save-first: she makes cafés, stays, beauty, fashion, events, and city plans feel aspirational but reachable.`,
    {
      aliases: ["content strategy", "creator voice", "premium lifestyle", "soft luxury"],
      phrases: ["what content", "content create", "creator voice"],
      priority: 1.15,
    },
  ),
  chunk(
    "content-answer-playbook",
    "Answer playbook for what Iva can create",
    "site:answer-playbook.content",
    [
      "When users ask what Iva can create, ground the answer in these usable content types: reels, story sets, stills, creator visits, launch coverage, city guides, outfit-led edits, beauty rituals, food tables, room reveals, rooftop/date-night plans, and product lifestyle moments.",
      "A strong Iva answer should mention arrival mood, visual details, lifestyle context, one reason to save, and a natural CTA only when collaboration intent is clear.",
      "Avoid promising guaranteed results, exact posting timelines, prices, or availability in chat.",
    ].join(" "),
    {
      aliases: [
        "content ideas",
        "content plan",
        "creator deliverables",
        "what can Iva make",
        "reel story stills",
      ],
      phrases: ["what can iva create", "content ideas", "content plan"],
      priority: 1.24,
    },
  ),
  chunk(
    "collaborations",
    "Collaboration and brand partnership fit",
    "site:brand-data.mediaKit",
    `Paid collaboration route: ${instagramProfile.collaborationCta}. Good fits: ${mediaKit.brandFit.join("; ")}. Collaboration types: ${collaborationTypes.join(", ")}. Iva is strongest for brands that want the product or place to feel like a real plan rather than a hard-sell ad.`,
    {
      aliases: [
        "brand marketing",
        "influencer marketing",
        "Bengaluru marketing",
        "campaign",
        "paid partnership",
      ],
      phrases: ["how can brands collaborate", "brand partnership", "influencer marketing"],
      priority: 1.3,
    },
  ),
  chunk(
    "collaboration-menu",
    "Collaboration packages",
    "site:brand-data.mediaKit.collaborationMenu",
    mediaKit.collaborationMenu.map((item) => `${item.title}: ${item.text}`).join(" "),
    {
      aliases: ["reel package", "story set", "creator visit", "deliverables"],
      phrases: ["collaboration package", "creator visit", "save-worthy reel"],
      priority: 1.15,
    },
  ),
  chunk(
    "collaboration-workflow",
    "Collaboration workflow and response guidance",
    "site:answer-playbook.collaborationWorkflow",
    [
      "For collaboration questions, answer in a brand-friendly way: clarify the brand category, suggest the best content lane, mention likely formats from the collaboration menu, and route final scope, rates, dates, and approval details to email.",
      `Contact route: ${creator.email}. Public CTA: ${instagramProfile.collaborationCta}.`,
      `Collaboration highlights include ${collaborationHighlights}. Recent signals include ${recentBrandSignals}.`,
    ].join(" "),
    {
      aliases: [
        "brand enquiry",
        "brand inquiry",
        "paid collab process",
        "booking process",
        "campaign workflow",
        "how to collaborate",
      ],
      phrases: ["brand inquiry", "paid collaboration", "how to collaborate"],
      priority: 1.22,
    },
  ),
  chunk(
    "partnership-angles",
    "Partnership strategy and premium marketing angles",
    "site:brand-data.mediaKit.partnershipAngles",
    [
      ...mediaKit.whyBrandsCare.map((item) => `${item.title}: ${item.text}`),
      ...mediaKit.partnershipAngles.map((item) => `${item.label} - ${item.title}: ${item.text}`),
      `Brand promise: ${mediaKit.brandPromise.join("; ")}.`,
    ].join(" "),
    {
      aliases: ["premium campaign", "creator strategy", "Bangalore marketing", "Bengaluru brand growth"],
      phrases: ["why brands care", "premium creator", "brand strategy"],
      priority: 1.22,
    },
  ),
  chunk(
    "hospitality-cafe-playbook",
    "Hotel, cafe, restaurant, rooftop, and hospitality content playbook",
    "site:answer-playbook.hospitality",
    [
      "For hotels, boutique stays, resorts, and staycations, Iva's best story arc is arrival, check-in mood, room reveal, property details, dining, poolside or golden-hour light, and one clear reason to save or book.",
      "For cafes, restaurants, breweries, rooftops, and food brands, Iva should frame entrance mood, table styling, plating, service cues, ambience, outfit context, and why the place becomes a weekend, date-night, brunch, or friend-plan save.",
      "Useful brand examples/signals: Hilton, Hilton Manyata, JW Marriott, Hyatt Centric, Sheraton, The Bier Library, Tipsy Bull, Nandhana Palace, Long Boat Brewing Co., Pizza Hut, Swiggy.",
    ].join(" "),
    {
      aliases: [
        "hotel content",
        "cafe content",
        "restaurant content",
        "rooftop content",
        "hospitality campaign",
        "staycation reel",
        "room reveal",
        "food reel",
      ],
      phrases: ["hotel content", "cafe content", "restaurant content", "room reveal", "rooftop campaign"],
      priority: 1.38,
    },
  ),
  chunk(
    "beauty-fashion-playbook",
    "Beauty, skincare, salon, fashion, and retail content playbook",
    "site:answer-playbook.beautyFashion",
    [
      "For beauty, skincare, makeup, salon, self-care, and personal-care brands, Iva should focus on soft glam, skin-first details, getting-ready rituals, product texture, before/after experience notes when appropriate, and a polished but natural recommendation tone.",
      "For fashion, retail, Indianwear, events, bags, and outfit-led campaigns, Iva should show outfit context, try-on energy, shopping day mood, event arrival, styling details, and how the product fits real Bengaluru plans.",
      "Useful brand examples/signals: Maybelline, Estee Lauder, Sephora, Bioderma, CeraVe, Garnier, Pond's, Palmolive, Hair Masters, Michael Kors, Zouk, The Bear House.",
    ].join(" "),
    {
      aliases: [
        "beauty launch",
        "skincare launch",
        "salon collab",
        "fashion reel",
        "retail visit",
        "outfit content",
        "try-on reel",
      ],
      phrases: ["beauty launch", "fashion content", "salon collaboration", "retail visit", "outfit context"],
      priority: 1.34,
    },
  ),
  chunk(
    "events-culture-playbook",
    "Events, concerts, launches, and culture content playbook",
    "site:answer-playbook.events",
    [
      "For events, concerts, openings, launches, previews, and hosted experiences, Iva should make the moment easy to understand fast: arrival, venue energy, key product/place reveal, crowd or ambience, outfit cue, and one clear reason it matters.",
      "Best use cases include collection launches, menu previews, beauty activations, fashion shows, concerts, nightlife events, hosted tables, and quick city-culture moments.",
      "Keep the tone warm and editorial, not like a ticketing announcement.",
    ].join(" "),
    {
      aliases: [
        "event coverage",
        "concert collab",
        "launch coverage",
        "opening night",
        "fashion show",
        "brand activation",
      ],
      phrases: ["event coverage", "concert collaboration", "launch coverage", "fashion show"],
      priority: 1.18,
    },
  ),
  chunk(
    "home-lifestyle-products-playbook",
    "Lifestyle, home, furniture, wellness, and product content playbook",
    "site:answer-playbook.productsHome",
    [
      "For lifestyle products, furniture, home, wellness, gifting, bags, creator tools, and everyday essentials, Iva should show the product inside a real ritual: getting ready, cafe day bag, staycation packing, home reset, event night, desk/editing day, or travel pouch.",
      "Product content should feel tactile and useful: what it solves, how it looks in real life, where it fits, and why it is worth saving.",
      "Useful brand examples/signals include Amazon, Swiggy Giftables, Colgate, Sanfe, Pee Safe, WOW, Nutriorg, Fixderma, Zouk, and furniture/home collaboration highlights.",
    ].join(" "),
    {
      aliases: [
        "product content",
        "home collab",
        "furniture collab",
        "wellness product",
        "lifestyle product",
        "giftables",
        "creator tools",
      ],
      phrases: ["product content", "furniture collaboration", "home content", "lifestyle products"],
      priority: 1.16,
    },
  ),
  chunk(
    "contact-social",
    "Contact and social links",
    "site:brand-data.creator",
    `Email: ${creator.email}. Instagram: ${creator.instagramUrl}. YouTube: ${creator.youtubeUrl}. Facebook: ${creator.facebookPageUrl}. Website: ${creator.websiteUrl}.`,
    {
      aliases: ["reach", "book", "booking", "dm", "follow", "instagram"],
      phrases: ["contact iva", "follow iva", "where can i follow"],
      priority: 1.22,
    },
  ),
  chunk(
    "audience",
    "Audience and media kit numbers",
    "site:brand-data.mediaKit",
    `Instagram profile: ${instagramProfile.followers} followers, ${instagramProfile.posts} posts. Stats: ${stats.map((stat) => `${stat.label} ${stat.value} ${stat.note}`).join(", ")}. Media kit ${mediaKit.reportingWindow}: ${mediaKit.insights.map((item) => `${item.label} ${item.value} ${item.note}`).join(", ")}. Profile activity: ${mediaKit.profileActivity.map((item) => `${item.label} ${item.value} ${item.note}`).join(", ")}.`,
    {
      aliases: ["media kit", "followers", "views", "interactions", "analytics", "insights"],
      phrases: ["media kit", "audience numbers", "followers"],
      priority: 1.2,
    },
  ),
  chunk(
    "audience-formats",
    "Audience content formats and media-kit interpretation",
    "site:brand-data.mediaKit.formats",
    `${audienceFormatSignals} Interpret this carefully: reels are strongest for discovery, stories are strong for retention and campaign touchpoints, and posts are useful as evergreen proof. Do not overclaim conversions or guaranteed reach.`,
    {
      aliases: [
        "reels stories posts",
        "format split",
        "content format",
        "dashboard insights",
        "profile visits",
        "profile activity",
        "media kit interpretation",
      ],
      phrases: ["reels stories", "content format", "profile activity", "dashboard insights"],
      priority: 1.18,
    },
  ),
  chunk(
    "demographics",
    "Audience demographics",
    "site:brand-data.demographics",
    `Top age bands: ${demographics.age.map((item) => `${item.label} ${item.value}%`).join(", ")}. Gender: ${demographics.gender.map((item) => `${item.label} ${item.value}%`).join(", ")}. Countries: ${demographics.geography.map((item) => `${item.label} ${item.value}%`).join(", ")}. Top cities: ${mediaKit.audience.topCities.map((item) => `${item.label} ${item.value}%`).join(", ")}.`,
    {
      aliases: ["audience split", "age", "gender", "cities", "India audience"],
      phrases: ["audience demographics", "top cities"],
    },
  ),
  chunk(
    "bengaluru-marketing",
    "Bengaluru influencer marketing and city authority",
    "site:brand-data.markets.bengaluru",
    bengaluruSignals,
    {
      aliases: [
        "Bangalore marketing",
        "Bengaluru influencer",
        "Bangalore influencer",
        "city guide",
        "premium cafes Bangalore",
        "rooftop cafes Bangalore",
        "date night Bangalore",
      ],
      phrases: ["bengaluru marketing", "bangalore marketing", "bengaluru guide", "bangalore influencer"],
      priority: 1.34,
    },
  ),
  chunk(
    "bengaluru-neighborhood-playbook",
    "Bengaluru neighborhood content guidance",
    "site:brand-data.neighborhoods",
    `${neighborhoodSignals} Use Indiranagar for easy beautiful evenings, cafes, dinner tables, rooftops, and premium experiences. Use Koramangala for modern cafes, weekend energy, couple experiences, and dinner plans. Use HSR for calm cafes, brunch tables, and neighborhood discoveries. Use MG Road for old-city texture, polished evenings, classic Bengaluru charm, and luxury experiences.`,
    {
      aliases: [
        "Indiranagar",
        "Koramangala",
        "HSR",
        "MG Road",
        "Bangalore neighborhoods",
        "Bengaluru neighborhoods",
        "area guide",
      ],
      phrases: ["which area", "neighborhood guide", "bengaluru neighborhoods", "bangalore neighborhoods"],
      priority: 1.26,
    },
  ),
  chunk(
    "markets",
    "Website city and travel content",
    "site:brand-data.markets",
    marketSignals,
    {
      aliases: ["city guides", "Goa", "Mumbai", "Pune", "Kolkata", "travel"],
      phrases: ["city content", "travel content"],
    },
  ),
  chunk(
    "city-market-positioning",
    "City market positioning for Bengaluru, Goa, Mumbai, Pune, and Kolkata",
    "site:answer-playbook.markets",
    [
      "Bengaluru is the home-city anchor for rooftops, cafes, boutique stays, and city nights.",
      "Goa works for slow luxury, boutique stays, sunset tables, poolside light, and coastal escapes.",
      "Mumbai works for sharper city energy, fashion-led cafes, hotel moments, and premium hospitality.",
      "Pune works for calm cafes, thoughtful menus, and easy weekend discoveries.",
      "Kolkata works for heritage stays, cultural dining, old-world charm, saree moments, and selective cultural luxury.",
    ].join(" "),
    {
      aliases: [
        "Goa collaboration",
        "Mumbai content",
        "Pune cafes",
        "Kolkata heritage",
        "city expansion",
        "travel markets",
      ],
      phrases: ["which cities", "city markets", "travel markets", "goa collaboration"],
      priority: 1.12,
    },
  ),
  chunk(
    "trusted-brands",
    "Trusted brand signals",
    "site:brand-data.trustedBrands",
    brandSignals,
    {
      aliases: trustedBrands.map((brand) => brand.name),
      phrases: ["trusted brands", "worked with"],
      priority: 1.1,
    },
  ),
  chunk(
    "recent-brand-proof",
    "Recent brand and collaboration signals",
    "site:brand-data.instagramProfile.recentCollaborationSignals",
    `Recent collaboration signals: ${recentBrandSignals}. Collaboration highlights: ${collaborationHighlights}. Trusted-brand spread includes hospitality, beauty, personal care, fashion, food, nightlife, travel, wellness, bags, furniture/home, and lifestyle products. Use this to answer whether Iva has brand proof in a category without claiming contracts beyond the public signals.`,
    {
      aliases: [
        "recent collabs",
        "recent collaborations",
        "brand proof",
        "past work",
        "worked with",
        "client examples",
      ],
      phrases: ["recent collaborations", "brand proof", "past work", "worked with"],
      priority: 1.22,
    },
  ),
  chunk(
    "performance",
    "Performance examples",
    "site:brand-data.topContent",
    `${performanceSignals}. Media-kit proof: ${performanceProofSignals}. Use these as examples of category fit, not guaranteed future performance.`,
    {
      aliases: ["views", "proof", "top reels", "case studies", "results"],
      phrases: ["performance examples", "top content"],
      priority: 1.12,
    },
  ),
  chunk(
    "visual-stories",
    "Visual story examples",
    "site:brand-data.visualStories",
    storySignals,
    {
      aliases: ["creative direction", "storytelling", "mood", "reel ideas", "visual style"],
      phrases: ["visual stories", "story examples"],
    },
  ),
  chunk(
    "shop-products",
    "Iva's product shelves and affiliate recommendations",
    "site:brand-data.dailyProductShelves",
    shopSignals,
    {
      aliases: ["Amazon", "products", "recommendations", "beauty kit", "travel pouch", "creator kit"],
      phrases: ["shop iva", "product recommendations", "amazon"],
    },
  ),
  chunk(
    "shop-affiliate-details",
    "Shop, Amazon affiliate, and product shelf guidance",
    "site:brand-data.shop",
    [
      `Shop partner: ${amazonAffiliate.label}. Storefront: ${amazonAffiliate.storefrontUrl}. Affiliate tag: ${amazonAffiliate.tag}.`,
      shopQuickLinkSignals,
      "When answering product recommendation questions, keep it practical and style-led. Mention that product links live in the Shop section. Do not imply medical, skin, or financial advice.",
    ].join(" "),
    {
      aliases: [
        "amazon storefront",
        "amazon affiliate",
        "shop links",
        "beauty minis",
        "cafe outfit",
        "staycation essentials",
        "creator kit",
        "event night",
        "monsoon cafe",
      ],
      phrases: ["amazon storefront", "shop links", "affiliate", "creator kit", "staycation essentials"],
      priority: 1.18,
    },
  ),
  ...editorialSignals,
  chunk(
    "parenting",
    "Parenting content boundary",
    "site:grounding-policy",
    "The current website knowledge base does not include detailed parenting stories or advice. If asked about parenting, answer conversationally but clearly say the available site context focuses more on lifestyle, beauty, food, travel, fashion, collaborations, and city experiences.",
    {
      aliases: ["parenting", "family", "kids", "children"],
    },
  ),
  chunk(
    "faq",
    "Common FAQs",
    "site:faq-policy",
    `For collaboration, contact Iva by email: ${creator.email} or the contact page. For where to follow, use Instagram ${creator.instagramUrl}, YouTube ${creator.youtubeUrl}, Facebook ${creator.facebookPageUrl}, and the website ${creator.websiteUrl}. For rates, availability, booking dates, or private details, ask the visitor to contact Iva directly.`,
    {
      aliases: ["rates", "availability", "booking", "price", "pricing", "private details"],
      phrases: ["how much", "rates", "availability"],
      priority: 1.15,
    },
  ),
] as const satisfies readonly KnowledgeChunk[];

const DEFAULT_CHUNK_IDS = new Set([
  "profile",
  "bengaluru-marketing",
  "collaborations",
  "content-pillars",
]);
const MAX_RETRIEVED_TEXT_CHARS = 520;

function trimRetrievedText(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();

  if (normalized.length <= MAX_RETRIEVED_TEXT_CHARS) {
    return normalized;
  }

  return `${normalized.slice(0, MAX_RETRIEVED_TEXT_CHARS).trimEnd()}...`;
}

export function searchKnowledgeBase(query: string, limit = 4): RetrievedChunk[] {
  const expandedQuery = `${query} ${expandMultilingualQuery(query)}`.trim();
  const queryTokens = tokenize(expandedQuery);
  const normalizedQuery = query.toLowerCase().replace(/\s+/g, " ").trim();

  if (queryTokens.length === 0) {
    return KNOWLEDGE_BASE
      .filter((item) => DEFAULT_CHUNK_IDS.has(item.id))
      .slice(0, limit)
      .map((item) => toRetrievedChunk(item, 1));
  }

  const scored = KNOWLEDGE_BASE.map((item) => {
    const tokenScore = queryTokens.reduce((total, token) => {
      if (item.tokens.has(token)) {
        return total + 3;
      }

      const fuzzyHit = [...item.tokens].some((candidate) => {
        if (token.length < 5 || candidate.length < 5) {
          return false;
        }

        return candidate.startsWith(token) || token.startsWith(candidate);
      });

      return fuzzyHit ? total + 1 : total;
    }, 0);

    const phraseScore = item.phrases.reduce(
      (total, phrase) => (normalizedQuery.includes(phrase) ? total + 4 : total),
      0,
    );
    const score = (tokenScore + phraseScore) * item.priority;

    return { item, score };
  })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (scored.length === 0 && /\b(iva|creator|influencer|bangalore|bengaluru)\b/i.test(query)) {
    return KNOWLEDGE_BASE
      .filter((item) => DEFAULT_CHUNK_IDS.has(item.id))
      .slice(0, limit)
      .map((item) => toRetrievedChunk(item, 0.5));
  }

  return scored.map(({ item, score }) => toRetrievedChunk(item, Number(score.toFixed(2))));
}

export function getRetrievalConfidence(chunks: RetrievedChunk[]) {
  const topScore = chunks[0]?.score ?? 0;

  if (topScore <= 0) {
    return 0;
  }

  if (topScore < 1) {
    return 0.32;
  }

  return Math.min(0.92, 0.38 + topScore / 18);
}

function inferMood(item: RetrievedChunk) {
  const text = `${item.title} ${item.text}`.toLowerCase();

  if (/(hotel|stay|staycation|room|hospitality|resort)/.test(text)) {
    return "calm, polished, stay-worthy hospitality";
  }

  if (/(cafe|coffee|restaurant|food|dining|rooftop)/.test(text)) {
    return "warm table details, golden light, save-worthy city plans";
  }

  if (/(beauty|fashion|salon|skincare|outfit|event)/.test(text)) {
    return "modern feminine luxury, soft glam, wearable polish";
  }

  if (/(audience|followers|views|analytics|demographics)/.test(text)) {
    return "credible, brand-safe, performance-aware";
  }

  return "premium Bengaluru lifestyle, personal but editorial";
}

function inferVisualStyle(item: RetrievedChunk) {
  const text = `${item.title} ${item.text}`.toLowerCase();

  if (/(hotel|stay|room|resort)/.test(text)) {
    return "arrival moments, room reveal, slow property details, dining, golden hour";
  }

  if (/(cafe|restaurant|food|rooftop)/.test(text)) {
    return "entrance mood, table styling, plating, ambience, one reason to save";
  }

  if (/(beauty|fashion|salon|event)/.test(text)) {
    return "skin-first detail, outfit context, try-on energy, polished event cues";
  }

  return "clean frames, city texture, tasteful details, emotionally useful captions";
}

export function formatRetrievedKnowledge(chunks: RetrievedChunk[]) {
  return chunks
    .map(
      (item) =>
        [
          `T: ${item.title}`,
          `Mood: ${inferMood(item)}`,
          `Ctx: ${trimRetrievedText(item.text)}`,
          `Visual: ${inferVisualStyle(item)}`,
        ].join("\n"),
    )
    .join("\n\n");
}
