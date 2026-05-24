import "server-only";

import { getCuratedFaqAnswer } from "@/lib/ai/curated-faq";
import {
  formatRetrievedKnowledge,
  getRetrievalConfidence,
  searchKnowledgeBase,
} from "@/lib/ai/knowledge-base";

export type IvaContextToolResult = {
  mode: "rag";
  answer: null;
  confidence: number;
  retrievalScore: number;
  intentId: null;
  knowledge: string;
  faqFallback: {
    answer: string;
    confidence: number;
    intentId: string;
  } | null;
};

export function getIvaContextToolResult(
  query: string,
  limit: number,
): IvaContextToolResult {
  const chunks = searchKnowledgeBase(query, limit);
  const knowledge = formatRetrievedKnowledge(chunks);
  const faq = getCuratedFaqAnswer(query);
  const confidence = getRetrievalConfidence(chunks);
  const retrievalScore = chunks[0]?.score ?? 0;

  return {
    mode: "rag",
    answer: null,
    confidence,
    retrievalScore,
    intentId: null,
    knowledge,
    // FAQ is deliberately carried as recovery context, not used before AI
    // unless retrieval is too weak to ground a useful answer.
    faqFallback: faq,
  };
}
