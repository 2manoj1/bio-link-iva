// Fill missing fields in partial CMS documents without restoring cleared arrays.
export function mergeContentDefaults<T>(defaults: T, value: unknown): T {
  if (value === null || value === undefined) return defaults;
  if (Array.isArray(defaults)) return (Array.isArray(value) ? value : defaults) as T;
  if (typeof defaults === 'object' && defaults !== null) {
    if (typeof value !== 'object' || Array.isArray(value)) return defaults;
    const source = value as Record<string, unknown>;
    return Object.fromEntries(Object.entries(defaults).map(([key, fallback]) => [
      key, mergeContentDefaults(fallback, source[key]),
    ])) as T;
  }
  return (typeof value === typeof defaults ? value : defaults) as T;
}
