import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

type CachedAnswer = {
  answer: string;
  expiresAt: number;
};

const memoryCache = new Map<string, CachedAnswer>();
const cacheDir = path.join(tmpdir(), "iva-chat-cache");
const cacheFile = path.join(cacheDir, "answers.json");

function getCacheTtlMs() {
  const seconds = Number(process.env.IVA_CHAT_CACHE_TTL_SECONDS ?? 60 * 60 * 24);
  return Math.max(60, seconds) * 1000;
}

function safeKey(key: string) {
  return key.trim().toLowerCase().replace(/\s+/g, " ").slice(0, 280);
}

async function readFileCache() {
  try {
    const raw = await readFile(cacheFile, "utf8");
    return JSON.parse(raw) as Record<string, CachedAnswer>;
  } catch {
    return {};
  }
}

async function writeFileCache(entries: Record<string, CachedAnswer>) {
  try {
    await mkdir(cacheDir, { recursive: true });
    await writeFile(cacheFile, JSON.stringify(entries), "utf8");
  } catch {
    // /tmp is best-effort on serverless. Memory cache remains the primary layer.
  }
}

export async function getCachedAnswer(key: string) {
  const normalizedKey = safeKey(key);
  const cached = memoryCache.get(normalizedKey);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.answer;
  }

  const fileCache = await readFileCache();
  const fileEntry = fileCache[normalizedKey];

  if (!fileEntry || fileEntry.expiresAt <= Date.now()) {
    if (fileEntry) {
      delete fileCache[normalizedKey];
      await writeFileCache(fileCache);
    }

    memoryCache.delete(normalizedKey);
    return null;
  }

  memoryCache.set(normalizedKey, fileEntry);
  return fileEntry.answer;
}

export async function setCachedAnswer(key: string, answer: string) {
  const normalizedKey = safeKey(key);
  const entry = {
    answer,
    expiresAt: Date.now() + getCacheTtlMs(),
  };

  memoryCache.set(normalizedKey, entry);

  const fileCache = await readFileCache();
  fileCache[normalizedKey] = entry;
  await writeFileCache(fileCache);
}
