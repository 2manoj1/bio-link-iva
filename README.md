This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Chatbot Setup

The site includes a floating Q&A concierge powered by the Vercel AI SDK, Google Gemini via AI Studio, and a small LangGraph agent.

Create a local `.env.local` file and add the same values to the Vercel Hobby project environment variables:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_studio_key
IVA_CHAT_MODEL=gemini-flash-latest
IVA_CHAT_MODEL_FAMILY=gemini
IVA_CHAT_GENERATION_MODE=stream
IVA_CHAT_MAX_OUTPUT_TOKENS=260
IVA_CHAT_MAX_RETRIES=1
IVA_CHAT_RETRIEVAL_LIMIT=3
IVA_CHAT_THINKING_ENABLED=false
IVA_CHAT_THINKING_BUDGET=0
IVA_CHAT_DAILY_LIMIT=16
IVA_CHAT_BURST_LIMIT=4
IVA_CHAT_CACHE_TTL_SECONDS=86400
NEXT_PUBLIC_SITE_URL=https://iva.manojmukherjee.co.in
```

For Gemma, use generation mode because this model family may return empty text on Google streaming:

```bash
IVA_CHAT_MODEL=gemma-4-26b-a4b-it
IVA_CHAT_MODEL_FAMILY=gemma
IVA_CHAT_GENERATION_MODE=generate
IVA_CHAT_MAX_OUTPUT_TOKENS=1024
IVA_CHAT_MAX_RETRIES=1
IVA_CHAT_RETRIEVAL_LIMIT=2
```

When the API key is missing, Gemini quota is exhausted, or the daily visitor limit is reached, the chatbot returns a fixed template answer instead of failing.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Launch and CMS operations

See [CMS operations](scripts/sanity/README.md) for editing, validation, backups, recovery, and production configuration. Copy `.env.example` for the required variable names. Admin editing uses Sanity login at `/studio`; `/admin` redirects there.

Run `pnpm check` before deployment. AI generation also requires the shared Redis quota store documented above. The contact form keeps its WhatsApp handoff and does not store inquiries.
