import "server-only";

import {
  collaborationTypes,
  creator,
  demographics,
  experiencePillars,
  instagramProfile,
  markets,
  mediaKit,
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
};

export type RetrievedChunk = Omit<KnowledgeChunk, "tokens"> & {
  score: number;
};

const STOP_WORDS = new Set([
  "about",
  "after",
  "also",
  "and",
  "are",
  "brand",
  "can",
  "does",
  "for",
  "from",
  "how",
  "iva",
  "she",
  "that",
  "the",
  "this",
  "what",
  "when",
  "where",
  "with",
  "you",
]);

function tokenize(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9@.+-]+/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

function chunk(id: string, title: string, source: string, text: string): KnowledgeChunk {
  return {
    id,
    title,
    source,
    text,
    tokens: new Set(tokenize(`${title} ${source} ${text}`)),
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

// Built once per server instance. Retrieval reads this immutable in-memory index.
export const KNOWLEDGE_BASE = [
  chunk(
    "profile",
    "Iva profile",
    "site:brand-data.creator",
    `${creator.name} is ${creator.title} based in ${creator.location}. ${creator.description} Website: ${siteUrl}. Handle: ${creator.handle}.`,
  ),
  chunk(
    "content-pillars",
    "Content creation and lifestyle pillars",
    "site:brand-data.experiencePillars",
    `Iva covers ${experiencePillars.join(", ")}. Her positioning is ${creator.positioning}`,
  ),
  chunk(
    "collaborations",
    "Collaboration and brand partnership fit",
    "site:brand-data.mediaKit",
    `Paid collaboration route: ${instagramProfile.collaborationCta}. Good fits: ${mediaKit.brandFit.join("; ")}. Collaboration types: ${collaborationTypes.join(", ")}.`,
  ),
  chunk(
    "collaboration-menu",
    "Collaboration packages",
    "site:brand-data.mediaKit.collaborationMenu",
    mediaKit.collaborationMenu.map((item) => `${item.title}: ${item.text}`).join(" "),
  ),
  chunk(
    "contact-social",
    "Contact and social links",
    "site:brand-data.creator",
    `Email: ${creator.email}. Instagram: ${creator.instagramUrl}. YouTube: ${creator.youtubeUrl}. Facebook: ${creator.facebookPageUrl}. Website: ${creator.websiteUrl}.`,
  ),
  chunk(
    "audience",
    "Audience and media kit numbers",
    "site:brand-data.mediaKit",
    `Instagram profile: ${instagramProfile.followers} followers, ${instagramProfile.posts} posts. Stats: ${stats.map((stat) => `${stat.label} ${stat.value}`).join(", ")}. Media kit ${mediaKit.reportingWindow}: ${mediaKit.insights.map((item) => `${item.label} ${item.value}`).join(", ")}.`,
  ),
  chunk(
    "demographics",
    "Audience demographics",
    "site:brand-data.demographics",
    `Top age bands: ${demographics.age.map((item) => `${item.label} ${item.value}%`).join(", ")}. Countries: ${demographics.geography.map((item) => `${item.label} ${item.value}%`).join(", ")}.`,
  ),
  chunk(
    "markets",
    "Website city and travel content",
    "site:brand-data.markets",
    marketSignals,
  ),
  chunk(
    "trusted-brands",
    "Trusted brand signals",
    "site:brand-data.trustedBrands",
    brandSignals,
  ),
  chunk(
    "performance",
    "Performance examples",
    "site:brand-data.topContent",
    performanceSignals,
  ),
  chunk(
    "visual-stories",
    "Visual story examples",
    "site:brand-data.visualStories",
    storySignals,
  ),
  chunk(
    "parenting",
    "Parenting content boundary",
    "site:grounding-policy",
    "The current website knowledge base does not include detailed parenting stories or advice. If asked about parenting, answer conversationally but clearly say the available site context focuses more on lifestyle, beauty, food, travel, fashion, collaborations, and city experiences.",
  ),
  chunk(
    "faq",
    "Common FAQs",
    "site:faq-policy",
    "For collaboration, contact Iva by email or the contact page. For where to follow, use Instagram, YouTube, Facebook, and the website. For rates, availability, booking dates, or private details, ask the visitor to contact Iva directly.",
  ),
] as const satisfies readonly KnowledgeChunk[];

export function searchKnowledgeBase(query: string, limit = 4): RetrievedChunk[] {
  const queryTokens = tokenize(query);

  if (queryTokens.length === 0) {
    return KNOWLEDGE_BASE.slice(0, limit).map((item) => toRetrievedChunk(item, 1));
  }

  const scored = KNOWLEDGE_BASE.map((item) => {
    const score = queryTokens.reduce((total, token) => {
      if (item.tokens.has(token)) {
        return total + 3;
      }

      const fuzzyHit = [...item.tokens].some(
        (candidate) => candidate.includes(token) || token.includes(candidate),
      );

      return fuzzyHit ? total + 1 : total;
    }, 0);

    return { item, score };
  })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(({ item, score }) => toRetrievedChunk(item, score));
}

export function formatRetrievedKnowledge(chunks: RetrievedChunk[]) {
  return chunks
    .map(
      (item, index) =>
        `[${index + 1}] ${item.title}\nSource: ${item.source}\n${item.text}`,
    )
    .join("\n\n");
}
