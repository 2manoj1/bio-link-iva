import "server-only";

import { getCuratedFaqAnswer } from "@/lib/ai/curated-faq";
import { formatRetrievedKnowledge, searchKnowledgeBase } from "@/lib/ai/knowledge-base";

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

export function getIvaContextToolResult(query: string, limit: number): IvaContextToolResult {
  const faq = getCuratedFaqAnswer(query);

  if (faq && faq.confidence >= 0.82) {
    return {
      mode: "faq",
      answer: faq.answer,
      confidence: faq.confidence,
      intentId: faq.intentId,
      knowledge: "",
    };
  }

  const chunks = searchKnowledgeBase(query, limit);
  const knowledge = formatRetrievedKnowledge(chunks);

  return {
    mode: "rag",
    answer: null,
    confidence: chunks.length > 0 ? Math.min(0.8, 0.45 + chunks[0].score / 20) : 0,
    intentId: null,
    knowledge,
  };
}
