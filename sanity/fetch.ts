import 'server-only';
import { unstable_rethrow } from 'next/navigation';
import { client } from './client';
import { recoverContent } from '@/lib/cms-recovery';

export async function fetchContent<T>(query: string, params: Record<string, string>, fallback: T): Promise<T> {
  return recoverContent(() => client.fetch<T>(query, params, {
      next: { revalidate: 60, tags: ['sanity-content'] },
    }), fallback, unstable_rethrow);
}
