'use client';

export default function GlobalError({reset}:{reset:()=>void}) {
  return <html lang="en"><body>
    <main style={{maxWidth:600,margin:'80px auto',padding:24,fontFamily:'sans-serif'}}>
      <h1>This page is temporarily unavailable</h1>
      <p>Please try again shortly.</p>
      <button onClick={reset}>Try again</button>
    </main>
  </body></html>;
}
