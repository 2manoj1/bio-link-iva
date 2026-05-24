"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  Bot,
  BriefcaseBusiness,
  Camera,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { creator } from "@/lib/brand-data";

const STORAGE_KEY = "iva-chat-messages";

const suggestedPrompts = [
  "Tell me about Iva",
  "How can brands collaborate?",
  "What content does she create?",
  "Where can I follow Iva?",
];

function getMessageText(
  message: ReturnType<typeof useChat>["messages"][number],
) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
      }),
    [],
  );

  const { messages, sendMessage, setMessages, status, stop, error } = useChat({
    transport,
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setMessages(JSON.parse(stored) as UIMessage[]);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, [setMessages]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(messages.slice(-20)),
    );
  }, [messages, hydrated]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  async function handleSend(text?: string) {
    const finalText = (text ?? input).trim();

    if (!finalText || isLoading) {
      return;
    }

    void sendMessage({
      text: finalText,
    });

    setInput("");
    setOpen(true);
  }

  function clearChatHistory() {
    window.localStorage.removeItem(STORAGE_KEY);

    setMessages([]);
  }

  return (
    <div
      className={cn(
        "fixed z-[999]",
        // Mobile
        "inset-x-0 bottom-0 my-auto mx-auto w-full",
        // Desktop
        "sm:bottom-6 sm:right-6 sm:left-auto sm:w-auto",
      )}
    >
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              aria-label="Close Ask Iva"
              className="fixed inset-0 z-0 cursor-default touch-none overscroll-none bg-black/45 backdrop-blur-[2px] sm:bg-black/35"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setOpen(false)}
              type="button"
            />

            <motion.div
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 16,
              }}
              transition={{
                duration: 0.2,
                ease: [0.2, 1, 0.36, 1],
              }}
              className={cn(
                "relative z-10 mb-0 flex max-h-[100svh] flex-col overflow-hidden sm:mb-4 sm:max-h-[calc(100svh-3rem)]",
                "w-full sm:w-[430px]",
                "rounded-t-4xl sm:rounded-[34px]",
                "border border-white/[0.08]",
                "bg-[#0F0F11]/85",
                "backdrop-blur-2xl",
                "shadow-[0_10px_60px_rgba(0,0,0,0.35)]",
              )}
            >
            {/* Premium Glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,212,135,0.12),transparent_40%)]" />

            {/* Header */}
            <div className="relative shrink-0 border-b border-white/[0.06] px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Luxury Orb */}
                  <div className="relative flex size-8 items-center justify-center rounded-full border border-[var(--gold)]/50 bg-[var(--ivory)]">
                    <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping" />
                    <Image
                      alt={creator.name}
                      className="object-cover object-top rounded-full"
                      fill
                      priority
                      src={creator.profileImage}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-[15px] font-semibold tracking-wide text-white">
                        Ask Iva
                      </h2>

                      <div className="flex items-center gap-1 rounded-full border border-emerald-500/10 bg-emerald-500/10 px-2 py-0.5">
                        <div className="size-1.5 rounded-full bg-emerald-400" />

                        <span className="text-[10px] font-medium text-emerald-400">
                          Online
                        </span>
                      </div>
                    </div>

                    <p className="mt-1 text-xs text-zinc-400">
                      Digital Creator
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {messages.length > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={clearChatHistory}
                      className="h-9 rounded-full border border-white/[0.05] bg-white/[0.03] px-4 text-xs text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                    >
                      Clear
                    </Button>
                  )}

                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => setOpen(false)}
                    className="size-9 rounded-full border border-white/[0.04] bg-white/[0.03] text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div
              ref={scrollRef}
              className={cn(
                "flex flex-col gap-4 overflow-y-auto px-4 py-4",
                "h-[min(68svh,520px)]",
                "min-h-0",
                "max-h-[calc(100svh-9.5rem)]",
                "sm:min-h-[560px]",
                "overscroll-contain",
                "[&::-webkit-scrollbar]:w-1.5",
                "[&::-webkit-scrollbar-thumb]:bg-white/10",
                "[&::-webkit-scrollbar-thumb]:rounded-full",
                "[&::-webkit-scrollbar-track]:bg-transparent",
              )}
            >
              {messages.length === 0 && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mt-auto mb-2"
                >
                  <div className="rounded-[30px] border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-2xl">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-full bg-[#F5D487]/10">
                        <Bot className="size-4 text-[#F5D487]" />
                      </div>

                      <div>
                        <h3 className="text-base font-semibold text-white">
                          Welcome to Ask Iva ✨
                        </h3>

                        <p className="text-xs text-zinc-400">
                          Curated lifestyle intelligence
                        </p>
                      </div>
                    </div>

                    <p className="mt-2 sm:mt-5 text-[12px] sm:text-sm leading-7 text-zinc-300">
                      Ask about partnership opportunities, media kit details and
                      lifestyle themes, shopping recommendations, or how to
                      contact Iva.
                    </p>

                    {/* Suggestions */}
                    <div className="mt-2 sm:mt-5 flex flex-wrap gap-2">
                      {suggestedPrompts.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => handleSend(prompt)}
                          className={cn(
                            "rounded-full",
                            "border border-white/[0.06]",
                            "bg-white/[0.04]",
                            "px-4 py-2",
                            "text-xs font-medium",
                            "text-zinc-300",
                            "backdrop-blur-xl",
                            "transition-all duration-300",
                            "hover:border-[#F5D487]/20",
                            "hover:bg-[#F5D487]/10",
                            "hover:text-white",
                            "hover:shadow-[0_10px_30px_rgba(245,212,135,0.08)]",
                          )}
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
                      <a
                        href="https://instagram.com/iva_mana5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-xs font-medium text-zinc-300 backdrop-blur-xl transition hover:bg-white/[0.06]"
                      >
                        <Camera className="size-3.5" />
                        Instagram
                      </a>

                      <a
                        href="/contact"
                        className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-xs font-medium text-zinc-300 backdrop-blur-xl transition hover:bg-white/[0.06]"
                      >
                        <BriefcaseBusiness className="size-3.5" />
                        Collaborate
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Messages */}
              {messages.map((message) => {
                const text = getMessageText(message);

                if (!text) {
                  return null;
                }

                const isAssistant = message.role === "assistant";

                return (
                  <motion.div
                    key={message.id}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className={cn(
                      "max-w-[88%]",
                      isAssistant ? "mr-auto" : "ml-auto",
                    )}
                  >
                    {isAssistant && (
                      <div className="mb-1 flex items-center gap-1.5 pl-2">
                        <Sparkles className="size-3 text-[#F5D487]" />

                        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                          Ask Iva
                        </span>
                      </div>
                    )}

                    <div
                      className={cn(
                        "px-4 py-3",
                        "text-sm leading-7 break-words",
                        isAssistant
                          ? [
                              "rounded-3xl rounded-bl-md",
                              "border border-white/[0.06]",
                              "bg-white/[0.04]",
                              "backdrop-blur-xl",
                              "text-zinc-200",
                            ]
                          : [
                              "rounded-3xl rounded-br-md",
                              "bg-gradient-to-br from-[#D6B36A] via-[#F5D487] to-[#B38728]",
                              "text-black",
                              "shadow-[0_10px_30px_rgba(245,212,135,0.18)]",
                            ],
                      )}
                    >
                      {isAssistant ? (
                        <div className="space-y-2">
                          <ReactMarkdown
                            components={{
                              a: ({ children, ...props }) => (
                                <a
                                  {...props}
                                  target={props.href?.startsWith("http") ? "_blank" : undefined}
                                  rel={props.href?.startsWith("http") ? "noreferrer" : undefined}
                                  className="font-medium text-[#F5D487] underline decoration-[#F5D487]/35 underline-offset-4 transition hover:text-white"
                                >
                                  {children}
                                </a>
                              ),

                              strong: ({ children }) => (
                                <strong className="font-semibold text-white">
                                  {children}
                                </strong>
                              ),

                              p: ({ children }) => (
                                <p className="text-zinc-200 last:mb-0">
                                  {children}
                                </p>
                              ),

                              ul: ({ children }) => (
                                <ul className="my-2 ml-4 list-disc space-y-1.5 marker:text-[#F5D487]">
                                  {children}
                                </ul>
                              ),

                              ol: ({ children }) => (
                                <ol className="my-2 ml-4 list-decimal space-y-1.5 marker:text-[#F5D487]">
                                  {children}
                                </ol>
                              ),

                              li: ({ children }) => (
                                <li className="pl-1 text-zinc-200">
                                  {children}
                                </li>
                              ),

                              code: ({ children }) => (
                                <code className="rounded-md border border-white/[0.08] bg-black/35 px-1.5 py-0.5 font-mono text-[0.9em] text-[#F5D487]">
                                  {children}
                                </code>
                              ),
                            }}
                          >
                            {text}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        text
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Loading */}
              {isLoading && (
                <div className="mr-auto">
                  <div className="rounded-3xl rounded-bl-md border border-white/[0.06] bg-white/[0.04] px-4 py-3 backdrop-blur-xl">
                    <div className="flex items-center gap-1">
                      <span className="size-2 rounded-full bg-[#F5D487] animate-bounce" />

                      <span className="size-2 rounded-full bg-[#F5D487] animate-bounce [animation-delay:120ms]" />

                      <span className="size-2 rounded-full bg-[#F5D487] animate-bounce [animation-delay:240ms]" />
                    </div>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="rounded-[24px] border border-red-500/10 bg-red-500/5 p-4 backdrop-blur-xl"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-red-300">
                        Iva AI is temporarily unavailable
                      </p>

                      <p className="mt-1 text-xs leading-6 text-zinc-400">
                        Please try again in a moment.
                      </p>
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        if (messages.length > 0) {
                          const lastUserMessage = [...messages]
                            .reverse()
                            .find((message) => message.role === "user");

                          if (lastUserMessage) {
                            void handleSend(getMessageText(lastUserMessage));
                          }
                        }
                      }}
                      className="rounded-full border border-white/[0.08] bg-white/[0.04] text-xs text-white hover:bg-white/[0.08]"
                    >
                      Try Again
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-white/[0.06] p-3 pb-[calc(env(safe-area-inset-bottom)+12px)]">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void handleSend();
                }}
              >
                <div className="flex items-end gap-2">
                  {/* Input */}
                  <div className="relative flex-1">
                    <Textarea
                      rows={1}
                      value={input}
                      placeholder="Ask Iva anything..."
                      onChange={(event) => setInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();

                          event.currentTarget.form?.requestSubmit();
                        }
                      }}
                      className={cn(
                        "min-h-12 max-h-32 resize-none",
                        "rounded-2xl",
                        "border border-white/[0.06]",
                        "bg-black/40",
                        "px-4 py-3 pr-12",
                        "text-sm text-white",
                        "shadow-inner",
                        "backdrop-blur-2xl",
                        "placeholder:text-zinc-500",
                        "focus-visible:ring-2",
                        "focus-visible:ring-[#F5D487]/20",
                        "focus-visible:border-[#F5D487]/20",
                      )}
                    />
                  </div>

                  {/* Send */}
                  <Button
                    type={isLoading ? "button" : "submit"}
                    onClick={isLoading ? stop : undefined}
                    disabled={!input.trim() && !isLoading}
                    className={cn(
                      "size-12 rounded-2xl",
                      "bg-gradient-to-br from-[#D6B36A] via-[#F5D487] to-[#B38728]",
                      "text-black",
                      "shadow-[0_10px_40px_rgba(245,212,135,0.28)]",
                      "transition-all duration-300",
                      "hover:scale-[1.03]",
                    )}
                  >
                    {isLoading ? (
                      <X className="size-4" />
                    ) : (
                      <ArrowUp className="size-4" />
                    )}
                  </Button>
                </div>
              </form>

              <p className="mt-3 text-center text-[10px] tracking-wide text-zinc-500">
                Powered by AI • Curated by Iva
              </p>
            </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Luxury Orb */}
      <motion.button
        whileTap={{
          scale: 0.95,
        }}
        whileHover={{
          scale: 1.05,
        }}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "mr-2 sm:mr-0 group relative ml-auto flex size-12 items-center justify-center overflow-hidden rounded-full",
          open
            ? "w-0 h-0 mb-0 sm:mb-0 opacity-0 transition-all duration-200 pointer-events-none sm:pointer-events-auto sm:w-12 sm:h-12 sm:opacity-100"
            : "w-12 h-12 mb-2 sm:mb-0 opacity-100 transition-all duration-200",
          "border border-white/[0.08]",
          "bg-gradient-to-br from-[#D6B36A] via-[#F5D487] to-[#B38728]",
          "shadow-[0_10px_50px_rgba(245,212,135,0.35)]",
        )}
      >
        <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute inset-0 animate-pulse rounded-full bg-[#F5D487]/20" />

        {open ? (
          <X className="relative z-10 size-5 text-black" />
        ) : (
          <MessageCircle className="relative z-10 size-5 text-black" />
        )}
      </motion.button>
    </div>
  );
}
