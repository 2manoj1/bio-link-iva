import { defineCliConfig } from 'sanity/cli';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local', quiet: true });
export default defineCliConfig({
  api: { projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET },
});
