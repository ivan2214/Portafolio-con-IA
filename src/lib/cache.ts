import type { Repositories } from "@/types";

const MINUTES = 1;
const CACHE_DURATION_MS = MINUTES * 60 * 1000; // 1 minute in ms
const cache: { [key: string]: { data: Repositories; expiresAt: number } } = {};

export function getFromCache(key: string): Repositories | null {
  const entry = cache[key];
  if (entry && entry.expiresAt > Date.now()) {
    return entry.data;
  }
  return null;
}

export function saveToCache(key: string, data: Repositories) {
  cache[key] = {
    data,
    expiresAt: Date.now() + CACHE_DURATION_MS,
  };
}
