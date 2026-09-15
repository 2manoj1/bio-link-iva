'use client';

export default function PublicError({ reset }: { reset: () => void }) {
  return <main className="mx-auto max-w-xl px-6 py-24 text-center">
    <h1 className="font-serif text-4xl">This page is temporarily unavailable</h1>
    <p className="my-6">Please try again in a moment.</p>
    <button onClick={reset} className="rounded-full border px-6 py-3">Try again</button>
  </main>;
}
