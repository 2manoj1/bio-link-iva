import dotenv from 'dotenv';

const path = process.argv[2];
if (path) dotenv.config({ path, quiet: true });
const required = ['NEXT_PUBLIC_SANITY_PROJECT_ID', 'NEXT_PUBLIC_SANITY_DATASET', 'NEXT_PUBLIC_SITE_URL', 'GOOGLE_GENERATIVE_AI_API_KEY'];
const errors = required.filter(key => !process.env[key]).map(key => `Missing ${key}`);
if (!(process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL)) errors.push('Missing Redis REST URL');
if (!(process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN)) errors.push('Missing Redis REST token');
if (process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.startsWith('https://')) errors.push('Production site URL must use HTTPS');
if (errors.length) {
  errors.forEach(error => console.error(error));
  process.exitCode = 1;
} else console.log('Required production configuration is present. No secrets printed.');
