import "server-only";

import { getCuratedFaqAnswer } from "@/lib/ai/curated-faq";
import {
  formatRetrievedKnowledge,
  searchKnowledgeBase,
} from "@/lib/ai/knowledge-base";

export type IvaContextToolResult =
  | {
      mode: "faq";
      answer: string;
      confidence: number;
      intentId: string;
      knowledge: string;
    }
  | {
      mode: "rag";
      answer: null;
      confidence: number;
      intentId: null;
      knowledge: string;
    };

export function getIvaContextToolResult(
  query: string,
  limit: number,
): IvaContextToolResult {
  const chunks = searchKnowledgeBase(query, limit);
  const knowledge = formatRetrievedKnowledge(chunks);

  const faq = getCuratedFaqAnswer(query);

  // AI FIRST
  if (chunks.length > 0 && chunks[0].score >= 2.5) {
    return {
      mode: "rag",
      answer: null,
      confidence: Math.min(0.88, 0.45 + chunks[0].score / 20),
      intentId: null,
      knowledge,
    };
  }

  // FAQ FALLBACK
  if (faq && faq.confidence >= 0.92) {
    return {
      mode: "faq",
      answer: faq.answer,
      confidence: faq.confidence,
      intentId: faq.intentId,
      knowledge: "",
    };
  }

  // LAST SAFE FALLBACK
  return {
    mode: "rag",
    answer: null,
    confidence: 0.3,
    intentId: null,
    knowledge,
  };
}
