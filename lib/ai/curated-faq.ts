import "server-only";

import {
  collaborationTypes,
  creator,
  demographics,
  experiencePillars,
  instagramProfile,
  markets,
  mediaKit,
  neighborhoods,
  stats,
  topContent,
  trustedBrands,
} from "@/lib/brand-data";

type CuratedFaqIntent = {
  id: string;
  patterns?: RegExp[];
  keywords: string[];
  answer: string;
  boost?: number;
  threshold?: number;
};

export type CuratedFaqAnswer = {
  answer: string;
  confidence: number;
  intentId: string;
};

const audienceSummary = [
  `${instagramProfile.followers} Instagram followers`,
  `${instagramProfile.posts} posts`,
  `YouTube ${stats.find((stat) => stat.label === "YouTube")?.value ?? "16K+"}`,
  `most-loved reel ${stats.find((stat) => stat.label === "Loved Reel")?.value ?? "319K"}`,
].join(", ");

const contactLink = `[${creator.email}](mailto:${creator.email})`;
const instagramLink = `[Instagram](${creator.instagramUrl})`;
const youtubeLink = `[YouTube](${creator.youtubeUrl})`;
const facebookLink = `[Facebook](${creator.facebookPageUrl})`;
const websiteLink = `[website](${creator.websiteUrl})`;
const pillarList = experiencePillars
  .map((pillar) => `- ${pillar}`)
  .join("\n");
const collaborationTypeList = collaborationTypes
  .map((type) => `- ${type}`)
  .join("\n");
const brandFitList = mediaKit.brandFit
  .map((fit) => `- ${fit}`)
  .join("\n");
const collaborationMenuList = mediaKit.collaborationMenu
  .map((item) => `- **${item.title}:** ${item.text}`)
  .join("\n");
const mediaInsightList = mediaKit.insights
  .map((item) => `- **${item.label}:** ${item.value}`)
  .join("\n");
const demographicList = [
  `- **Age:** ${demographics.age.map((item) => `${item.label} ${item.value}%`).join(", ")}`,
  `- **Gender:** ${demographics.gender.map((item) => `${item.label} ${item.value}%`).join(", ")}`,
  `- **Countries:** ${demographics.geography.map((item) => `${item.label} ${item.value}%`).join(", ")}`,
].join("\n");
const topCityList = mediaKit.audience.topCities
  .map((item) => `- **${item.label}:** ${item.value}%`)
  .join("\n");
const neighborhoodList = neighborhoods
  .map((item) => `- **${item.name}:** ${item.description.replace(/\.$/, "")}`)
  .join("\n");
const cityList = markets
  .map(
    (market) =>
      `- **${market.name}:** ${market.positioning.replace(/\.$/, "")}`,
  )
  .join("\n");
const brandList = trustedBrands
  .slice(0, 12)
  .map((brand) => `- **${brand.name}:** ${brand.focus}`)
  .join("\n");
const topContentList = topContent
  .map((item) => `- **${item.title}:** ${item.views} views (${item.category})`)
  .join("\n");

const FAQ_INTENTS: CuratedFaqIntent[] = [
  {
    id: "greeting-help",
    patterns: [/^(hi|hello|hey|help|who are you)\b/],
    keywords: ["help", "start"],
    answer: [
      "Hi, I am Iva's website concierge.",
      "",
      "**You can ask me about**",
      "- Iva's profile and content style",
      "- Paid collaborations and brand fit",
      "- Bengaluru cafes, rooftops, stays, and city plans",
      "- Media kit numbers and audience details",
      "- Beauty, fashion, food, travel, and how to contact her",
    ].join("\n"),
  },
  {
    id: "profile",
    patterns: [/who is iva/, /tell me about iva/, /about iva/, /iva chatterjee/],
    keywords: ["profile", "bio", "creator", "influencer", "iva", "chatterjee"],
    answer: [
      `**${creator.name}** is a ${creator.title} based in ${creator.location}.`,
      "",
      "She creates beauty, food, travel, lifestyle, cafe, hotel, fashion, and city-experience content with a polished Bengaluru soft-luxury point of view.",
    ].join("\n"),
  },
  {
    id: "content-pillars",
    patterns: [/what content/, /content.*create/, /what does.*create/, /niche/],
    keywords: ["content", "pillars", "niche", "topics", "beauty", "food", "travel", "lifestyle"],
    answer: [
      "Iva's content world is premium, personal, and save-worthy.",
      "",
      "**Core pillars**",
      pillarList,
      "",
      "The strongest thread is premium-but-personal storytelling across cafes, rooftops, boutique hospitality, beauty, fashion, food, travel, and Bengaluru city culture.",
    ].join("\n"),
  },
  {
    id: "collaborations",
    patterns: [/collaborat/, /paid collab/, /brand partnership/, /work with iva/, /campaign/],
    keywords: ["collaboration", "collab", "partnership", "campaign", "brand", "marketing", "sponsor"],
    answer: [
      "Brands can collaborate with Iva across premium lifestyle and city-experience stories.",
      "",
      "**Collaboration lanes**",
      collaborationTypeList,
      "",
      "**Best brand fits**",
      brandFitList,
      "",
      `For paid collaboration inquiries, email ${contactLink} or use the contact page.`,
    ].join("\n"),
    boost: 1,
  },
  {
    id: "collaboration-packages",
    patterns: [/package/, /deliverables/, /what can.*include/, /reel.*story/, /creator visit/],
    keywords: ["package", "deliverables", "reel", "story", "stories", "visit", "coverage"],
    answer: [
      "Iva's collaboration menu is built for clear, premium storytelling.",
      "",
      collaborationMenuList,
      "",
      `For exact scope, dates, and rates, email ${contactLink}.`,
    ].join("\n"),
    boost: 4,
  },
  {
    id: "rates-availability",
    patterns: [/rate/, /price/, /pricing/, /cost/, /availability/, /available/, /book/],
    keywords: ["rate", "rates", "price", "pricing", "cost", "availability", "available", "booking", "book"],
    answer: [
      `For **rates, availability, booking dates, and final scope**, please contact Iva directly at ${contactLink}.`,
      "",
      "The public site context keeps pricing and private scheduling details off-chat.",
    ].join("\n"),
  },
  {
    id: "contact-follow",
    patterns: [/contact/, /email/, /reach/, /follow/, /instagram/, /youtube/, /facebook/, /social/],
    keywords: ["contact", "email", "reach", "follow", "instagram", "youtube", "facebook", "social"],
    answer: [
      `You can reach Iva at ${contactLink}.`,
      "",
      "**Follow Iva**",
      `- ${instagramLink}`,
      `- ${youtubeLink}`,
      `- ${facebookLink}`,
      `- ${websiteLink}`,
    ].join("\n"),
  },
  {
    id: "media-kit",
    patterns: [/media kit/, /followers/, /audience/, /views/, /insights/, /analytics/, /numbers/],
    keywords: ["media", "kit", "followers", "audience", "views", "insights", "analytics", "numbers"],
    answer: [
      `Iva's media snapshot: ${audienceSummary}.`,
      "",
      `**Latest media-kit window:** ${mediaKit.reportingWindow}`,
      mediaInsightList,
      "",
      `For a brand discussion, email ${contactLink}.`,
    ].join("\n"),
  },
  {
    id: "demographics",
    patterns: [/demographic/, /age/, /gender/, /country/, /city split/, /top cit/],
    keywords: ["demographics", "age", "gender", "country", "countries", "cities", "split"],
    answer: [
      "**Audience demographics**",
      demographicList,
      "",
      "**Top city signals**",
      topCityList,
    ].join("\n"),
  },
  {
    id: "bengaluru",
    patterns: [/bengaluru/, /bangalore/, /city guide/, /indiranagar/, /koramangala/, /hsr/, /mg road/],
    keywords: ["bengaluru", "bangalore", "city", "guide", "indiranagar", "koramangala", "hsr", "rooftop", "cafe"],
    answer: [
      "Iva's Bengaluru marketing lane is rooftops, cafes, boutique stays, date-night plans, beauty, fashion, food discoveries, and premium city experiences worth saving.",
      "",
      "**Neighborhood notes**",
      neighborhoodList,
    ].join("\n"),
    boost: 1,
  },
  {
    id: "cities-travel",
    patterns: [/goa/, /mumbai/, /pune/, /kolkata/, /travel/, /city content/, /where.*cover/, /cities.*cover/, /markets/, /locations/],
    keywords: ["goa", "mumbai", "pune", "kolkata", "travel", "cities", "city", "markets", "locations"],
    answer: [
      "Iva's site currently frames these markets:",
      "",
      cityList,
      "",
      "Bengaluru is the home-city anchor, with Goa, Mumbai, Pune, and Kolkata shaped as selective travel and experience edits.",
    ].join("\n"),
    boost: 1,
  },
  {
    id: "brand-proof",
    patterns: [/worked with/, /brands/, /trusted/, /past collaboration/, /proof/],
    keywords: ["brands", "trusted", "proof", "worked", "collaborations", "clients"],
    answer: [
      "Iva has brand signals across beauty, food, hospitality, fashion, wellness, salons, travel, and lifestyle.",
      "",
      "**Selected brand signals**",
      brandList,
      "",
      "The point is not just reach; it is making a product or place feel desirable and save-worthy.",
    ].join("\n"),
  },
  {
    id: "performance",
    patterns: [/performance/, /top content/, /best reel/, /views/, /case stud/, /results/],
    keywords: ["performance", "views", "results", "case", "top", "reel"],
    answer: [
      "**Performance examples**",
      topContentList,
      "",
      "These show Iva's fit for fashion retail, rooftops, staycations, hospitality, and visual city experiences.",
    ].join("\n"),
  },
  {
    id: "cafes-food",
    patterns: [/cafe/, /coffee/, /restaurant/, /food/, /dining/, /rooftop/, /where to eat/],
    keywords: ["cafe", "cafes", "coffee", "restaurant", "food", "dining", "rooftop", "eat", "content", "create"],
    answer: [
      "For cafes, restaurants, rooftops, and food brands, Iva is strongest when the story has atmosphere.",
      "",
      "**What works well**",
      "- Arrival and venue mood",
      "- Table details, plating, and light",
      "- Service cues and ambience",
      "- One honest reason people would save the place for a plan",
    ].join("\n"),
    boost: 2,
  },
  {
    id: "hotels-stays",
    patterns: [/hotel/, /staycation/, /resort/, /boutique stay/, /room reveal/, /hospitality/],
    keywords: ["hotel", "staycation", "resort", "boutique", "stay", "room", "hospitality", "content", "create"],
    answer: [
      "For hotels, resorts, and staycations, Iva's best story flow is simple and visual.",
      "",
      "**Suggested story flow**",
      "- Arrival",
      "- Room reveal",
      "- Property details",
      "- Dining",
      "- Lifestyle moments",
      "- Golden-hour light",
      "- One clear reason to save or book the stay",
    ].join("\n"),
    boost: 2,
  },
  {
    id: "beauty-fashion",
    patterns: [/beauty/, /skincare/, /makeup/, /fashion/, /salon/, /outfit/, /event/],
    keywords: ["beauty", "skincare", "makeup", "fashion", "salon", "outfit", "event", "content", "create"],
    answer: [
      "Beauty, fashion, salon, and event brands fit Iva when the product feels wearable in real life.",
      "",
      "**Best content angles**",
      "- Soft glam and skin-first detail",
      "- Outfit context",
      "- Try-on energy",
      "- Polished event storytelling",
      "- A premium feel without hard-selling",
    ].join("\n"),
    boost: 2,
  },
  {
    id: "shop-products",
    patterns: [/shop/, /amazon/, /product/, /recommend/, /affiliate/, /creator kit/, /beauty kit/],
    keywords: ["shop", "amazon", "product", "recommendation", "affiliate", "kit"],
    answer: [
      "Iva's shop direction covers practical details from her everyday creator world.",
      "",
      "**Shop shelves include**",
      "- Beauty minis",
      "- Cafe outfits",
      "- Creator tools",
      "- Travel pouches",
      "- Soft home details",
      "- Gifts and staycation essentials",
      "- Event-night pieces and festive saree details",
      "",
      "Product links live in the Shop section.",
    ].join("\n"),
  },
  {
    id: "why-iva",
    patterns: [/why iva/, /why choose/, /why partner/, /good fit/, /premium creator/, /marketing in bengaluru/],
    keywords: ["why", "choose", "fit", "premium", "marketing", "partner"],
    answer: [
      "Choose Iva when a brand needs premium presentation with a warm personal voice.",
      "",
      "**Her sweet spot**",
      "- Cafes and rooftops",
      "- Hotels and staycations",
      "- Beauty and fashion",
      "- Food and city experiences",
      "",
      "She makes places and products feel like real plans people want to save, share, and try.",
    ].join("\n"),
  },
  {
    id: "parenting-boundary",
    patterns: [/parenting/, /parent/, /kids/, /children/, /family/],
    keywords: ["parenting", "parent", "kids", "children", "family"],
    answer: [
      "**Parenting note**",
      "",
      "The current site knowledge does not include detailed parenting stories or advice.",
      "",
      "I can still help with Iva's lifestyle, beauty, food, travel, fashion, collaborations, and city-experience context.",
    ].join("\n"),
  },
];

function normalizeQuestion(question: string) {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9@.+\s-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreIntent(intent: CuratedFaqIntent, normalizedQuestion: string) {
  const patternScore = intent.patterns?.some((pattern) => pattern.test(normalizedQuestion)) ? 8 : 0;
  const keywordScore = intent.keywords.reduce(
    (total, keyword) => (normalizedQuestion.includes(keyword) ? total + 1 : total),
    0,
  );

  return patternScore + keywordScore + (intent.boost ?? 0);
}

export function getCuratedFaqAnswer(question: string): CuratedFaqAnswer | null {
  const normalizedQuestion = normalizeQuestion(question);

  if (!normalizedQuestion) {
    return null;
  }

  const [best, secondBest] = FAQ_INTENTS.map((intent) => ({
    intent,
    score: scoreIntent(intent, normalizedQuestion),
  })).sort((a, b) => b.score - a.score);

  if (!best || best.score < (best.intent.threshold ?? 3)) {
    return null;
  }

  if (secondBest && best.score < 8 && best.score - secondBest.score < 2) {
    return null;
  }

  return {
    answer: best.intent.answer,
    confidence: Math.min(0.98, 0.55 + best.score / 20),
    intentId: best.intent.id,
  };
}
