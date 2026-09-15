export async function recoverContent<T>(read: () => Promise<T>, fallback: T, rethrow: (error: unknown) => void): Promise<T> {
  try {
    return await read();
  } catch (error) {
    rethrow(error);
    console.error('CMS content unavailable; serving fallback content.');
    return fallback;
  }
}
