import "server-only";

import {
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
  stay: ["staycation", "hotel"],
  stays: ["staycation", "hotel"],
  staycation: ["stay", "hotel"],
};

function tokenize(input: string) {
  const tokens = input
    .toLowerCase()
    .replace(/[^a-z0-9@.+-]+/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));

  return [...new Set(tokens.flatMap((token) => [token, ...(TOKEN_ALIASES[token] ?? [])]))];
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

const storySignals = visualStories
  .slice(0, 10)
  .map((story) => `${story.title}: ${story.mood}`)
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
    "performance",
    "Performance examples",
    "site:brand-data.topContent",
    performanceSignals,
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
const MAX_RETRIEVED_TEXT_CHARS = 820;

function trimRetrievedText(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();

  if (normalized.length <= MAX_RETRIEVED_TEXT_CHARS) {
    return normalized;
  }

  return `${normalized.slice(0, MAX_RETRIEVED_TEXT_CHARS).trimEnd()}...`;
}

export function searchKnowledgeBase(query: string, limit = 4): RetrievedChunk[] {
  const queryTokens = tokenize(query);
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

export function formatRetrievedKnowledge(chunks: RetrievedChunk[]) {
  return chunks
    .map(
      (item, index) =>
        `[${index + 1}] ${item.title}\nSource: ${item.source}\n${trimRetrievedText(item.text)}`,
    )
    .join("\n\n");
}
