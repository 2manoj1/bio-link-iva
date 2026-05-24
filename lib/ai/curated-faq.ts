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
const multilingualHotelCafePattern =
  /(হোটেল|ক্যাফে|কাফে|ব্র্যান্ড|কনটেন্ট|কন্টেন্ট|বেঙ্গালুরু|ব্যাঙ্গালোর|कंटेंट|कॉन्टेंट|होटल|कैफे|ब्रांड|बेंगलुरु|बैंगलोर|ಹೋಟೆಲ್|ಕ್ಯಾಫೆ|ಬ್ರ್ಯಾಂಡ್|ಕಂಟೆಂಟ್|ಬೆಂಗಳೂರು)/i;
const multilingualCollabPattern =
  /(collab|collaboration|partnership|campaign|ব্র্যান্ড|সহযোগ|কোলাব|পার্টনার|ब्रांड|सहयोग|पार्टनर|कैंपेन|ಬ್ರ್ಯಾಂಡ್|ಸಹಯೋಗ|ಪಾರ್ಟ್ನರ್|ಕ್ಯಾಂಪೇನ್)/i;
const bengaliScriptPattern = /[\u0980-\u09FF]/;
const devanagariScriptPattern = /[\u0900-\u097F]/;
const kannadaScriptPattern = /[\u0C80-\u0CFF]/;
const WORD_CHAR = "\\p{L}\\p{N}@.+-";

const FAQ_INTENTS: CuratedFaqIntent[] = [
  {
    id: "greeting-help",
    patterns: [/^(hi|hello|hey|help|who are you)(?:\b|$)/],
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
    patterns: [/\bwho is iva\b/, /\btell me about iva\b/, /\babout iva\b/, /\biva chatterjee\b/],
    keywords: ["profile", "bio", "creator", "influencer", "iva", "chatterjee"],
    answer: [
      `**${creator.name}** is a ${creator.title} based in ${creator.location}.`,
      "",
      "She creates beauty, food, travel, lifestyle, cafe, hotel, fashion, and city-experience content with a polished Bengaluru soft-luxury point of view.",
    ].join("\n"),
  },
  {
    id: "content-pillars",
    patterns: [/\bwhat content\b/, /\bcontent\b.*\bcreate\b/, /\bwhat does\b.*\bcreate\b/, /\bniche\b/],
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
    patterns: [/\bcollaborat(e|ion|ions)\b/, /\bpaid collab\b/, /\bbrand partnership\b/, /\bwork with iva\b/, /\bcampaign\b/],
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
    patterns: [/\bpackage(s)?\b/, /\bdeliverables?\b/, /\bwhat can\b.*\binclude\b/, /\breel\b.*\bstor(y|ies)\b/, /\bcreator visit\b/],
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
    patterns: [/\brates?\b/, /\bprice\b/, /\bpricing\b/, /\bcost\b/, /\bavailability\b/, /\bavailable\b/, /\bbook(ing)?\b/],
    keywords: ["rate", "rates", "price", "pricing", "cost", "availability", "available", "booking", "book"],
    answer: [
      `For **rates, availability, booking dates, and final scope**, please contact Iva directly at ${contactLink}.`,
      "",
      "The public site context keeps pricing and private scheduling details off-chat.",
    ].join("\n"),
  },
  {
    id: "contact-follow",
    patterns: [/\bcontact\b/, /\bemail\b/, /\breach\b/, /\bfollow\b/, /\binstagram\b/, /\byoutube\b/, /\bfacebook\b/, /\bsocial\b/],
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
    patterns: [/\bmedia kit\b/, /\bfollowers\b/, /\baudience\b/, /\bviews\b/, /\binsights\b/, /\banalytics\b/, /\bnumbers\b/],
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
    patterns: [/\bdemographics?\b/, /\bage\b/, /\bgender\b/, /\bcountr(y|ies)\b/, /\bcity split\b/, /\btop cit(y|ies)\b/],
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
    patterns: [/\bbengaluru\b/, /\bbangalore\b/, /\bcity guide\b/, /\bindiranagar\b/, /\bkoramangala\b/, /\bhsr\b/, /\bmg road\b/],
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
    patterns: [/\bgoa\b/, /\bmumbai\b/, /\bpune\b/, /\bkolkata\b/, /\btravel\b/, /\bcity content\b/, /\bwhere\b.*\bcover\b/, /\bcities\b.*\bcover\b/, /\bmarkets\b/, /\blocations\b/],
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
    patterns: [/\bworked with\b/, /\bbrands\b/, /\btrusted\b/, /\bpast collaboration\b/, /\bproof\b/],
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
    patterns: [/\bperformance\b/, /\btop content\b/, /\bbest reel\b/, /\bviews\b/, /\bcase stud(y|ies)\b/, /\bresults\b/],
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
    patterns: [/\bcafes?\b/, /\bcoffee\b/, /\brestaurants?\b/, /\bfood\b/, /\bdining\b/, /\brooftops?\b/, /\bwhere to eat\b/],
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
    patterns: [/\bhotels?\b/, /\bstaycations?\b/, /\bresorts?\b/, /\bboutique stay\b/, /\broom reveal\b/, /\bhospitality\b/],
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
    patterns: [/\bbeauty\b/, /\bskincare\b/, /\bmakeup\b/, /\bfashion\b/, /\bsalons?\b/, /\boutfits?\b/, /\bevents?\b/],
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
    patterns: [/\bshop\b/, /\bamazon\b/, /\bproducts?\b/, /\brecommend(ation|ations)?\b/, /\baffiliate\b/, /\bcreator kit\b/, /\bbeauty kit\b/],
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
    patterns: [/\bwhy iva\b/, /\bwhy choose\b/, /\bwhy partner\b/, /\bgood fit\b/, /\bpremium creator\b/, /\bmarketing in bengaluru\b/],
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
    patterns: [/\bparenting\b/, /\bparents?\b/, /\bkids\b/, /\bchildren\b/, /\bfamily\b/],
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
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}@.+\s-]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function tokenizeQuestion(question: string) {
  return new Set(question.split(/\s+/).filter(Boolean));
}

function hasExactToken(normalizedQuestion: string, tokens: Set<string>, keyword: string) {
  const normalizedKeyword = normalizeQuestion(keyword);

  if (!normalizedKeyword) {
    return false;
  }

  if (!normalizedKeyword.includes(" ")) {
    return tokens.has(normalizedKeyword);
  }

  return new RegExp(
    `(?:^|[^${WORD_CHAR}])${escapeRegExp(normalizedKeyword)}(?:$|[^${WORD_CHAR}])`,
    "iu",
  ).test(normalizedQuestion);
}

function getMultilingualFaqAnswer(question: string): CuratedFaqAnswer | null {
  if (!multilingualHotelCafePattern.test(question) || !multilingualCollabPattern.test(question)) {
    return null;
  }

  if (bengaliScriptPattern.test(question)) {
    return {
      intentId: "multilingual-hotel-cafe-brand",
      confidence: 0.86,
      answer: [
        "ইভা বেঙ্গালুরুর হোটেল, ক্যাফে বা রেস্তোরাঁ ব্র্যান্ডের জন্য প্রিমিয়াম কিন্তু স্বাভাবিক কনটেন্ট স্টোরি বানাতে পারে।",
        "",
        "**যে ধরনের কনটেন্ট ভালো কাজ করবে**",
        "- Arrival বা venue mood",
        "- Room reveal, table details, plating এবং ambience",
        "- Lifestyle moments, outfit context এবং soft glam",
        "- একটাই পরিষ্কার reason: মানুষ কেন জায়গাটা save বা book করবে",
        "",
        `Paid collaboration নিয়ে কথা বলতে হলে ${contactLink} এ email করা ভালো।`,
      ].join("\n"),
    };
  }

  if (devanagariScriptPattern.test(question)) {
    return {
      intentId: "multilingual-hotel-cafe-brand",
      confidence: 0.86,
      answer: [
        "Iva Bengaluru के hotel, cafe या restaurant brands के लिए premium लेकिन natural content story बना सकती है.",
        "",
        "**Best content angles**",
        "- Arrival और venue mood",
        "- Room reveal, table details, plating और ambience",
        "- Lifestyle moments, outfit context और soft glam",
        "- एक clear reason कि लोग जगह को क्यों save या book करें",
        "",
        `Paid collaboration के लिए ${contactLink} पर email करें.`,
      ].join("\n"),
    };
  }

  if (kannadaScriptPattern.test(question)) {
    return {
      intentId: "multilingual-hotel-cafe-brand",
      confidence: 0.86,
      answer: [
        "Iva Bengaluru hotel, cafe ಅಥವಾ restaurant brands ಗಾಗಿ premium ಆದರೆ natural content story ಮಾಡಬಹುದು.",
        "",
        "**Best content angles**",
        "- Arrival ಮತ್ತು venue mood",
        "- Room reveal, table details, plating ಮತ್ತು ambience",
        "- Lifestyle moments, outfit context ಮತ್ತು soft glam",
        "- ಜನರು save ಅಥವಾ book ಮಾಡಬೇಕೆನ್ನಿಸುವ ಒಂದು clear reason",
        "",
        `Paid collaboration ಗಾಗಿ ${contactLink} ಗೆ email ಮಾಡಿ.`,
      ].join("\n"),
    };
  }

  return null;
}

function scoreIntent(intent: CuratedFaqIntent, normalizedQuestion: string) {
  const patternScore = intent.patterns?.some((pattern) => pattern.test(normalizedQuestion)) ? 8 : 0;
  const words = tokenizeQuestion(normalizedQuestion);
  const keywordScore = intent.keywords.reduce(
    (total, keyword) =>
      (hasExactToken(normalizedQuestion, words, keyword) ? total + 1 : total),
    0,
  );

  return patternScore + keywordScore + (intent.boost ?? 0);
}

export function getCuratedFaqAnswer(question: string): CuratedFaqAnswer | null {
  const multilingualAnswer = getMultilingualFaqAnswer(question);

  if (multilingualAnswer) {
    return multilingualAnswer;
  }

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
