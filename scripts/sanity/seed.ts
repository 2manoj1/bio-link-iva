import { randomUUID } from 'node:crypto';
import { instagramStatsData } from "./data/instagram-stats";
import { mediaKitData } from "./data/media-kit";
import { premiumExperiencesData } from "./data/premium-experiences";
import { writeClient, getDataset } from "./utils/client";
import { log, logError, logSuccess, logWarning, printSummary } from "./utils/logger";
import {
  visualStories,
  trustedBrands,
  markets,
  shopQuickLinks,
  dailyProductShelves,
} from "../../lib/brand-data";

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const confirmProduction = args.includes("--confirm-production");

async function seed() {
  console.log(`\nIva CMS Seed`);
  console.log(`──────────────────────`);
  
  const dataset = getDataset();
  log(`Environment: ${dataset}`);
  if (isDryRun) {
    logWarning("Mode: DRY RUN");
  }
  
  if (dataset === "production" && !isDryRun && !confirmProduction) {
    console.log(`\nProduction dataset detected.\nSeed aborted.\nUse --confirm-production to continue.\n`);
    process.exit(1);
  }

  if (!isDryRun && !writeClient.config().token) {
    logError("SANITY_WRITE_TOKEN is missing. Cannot perform mutations.");
    process.exit(1);
  }

  const visualStoriesDocs = visualStories.map((story, i) => ({
    _id: `visualStory-${i}`,
    _type: 'visualStory',
    ...story,
  }));

  const trustedBrandsDocs = trustedBrands.map((brand, i) => ({
    _id: `trustedBrand-${i}`,
    _type: 'trustedBrand',
    ...brand,
  }));

  const marketsDocs = markets.map((market, i) => ({
    _id: `market-${i}`,
    _type: 'market',
    ...market,
  }));

  const shopQuickLinksDocs = shopQuickLinks.map((link, i) => ({
    _id: `shopQuickLink-${i}`,
    _type: 'shopQuickLink',
    ...link,
  }));

  const dailyProductShelvesDocs = dailyProductShelves.map((shelf, i) => ({
    _id: `dailyProductShelf-${i}`,
    _type: 'dailyProductShelf',
    ...shelf,
    products: shelf.products.map(product => ({ ...product, _key: randomUUID().replaceAll("-", "") })),
  }));

  const allDocs: { _id: string; _type: string }[] = [
    instagramStatsData,
    mediaKitData,
    ...premiumExperiencesData,
    ...visualStoriesDocs,
    ...trustedBrandsDocs,
    ...marketsDocs,
    ...shopQuickLinksDocs,
    ...dailyProductShelvesDocs,
  ];

  let created = 0;
  const updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const doc of allDocs) {
    if (isDryRun) {
      console.log(`${doc._type.padEnd(20)} CREATE\t${doc._id}`);
      created++;
      continue;
    }

    try {
      // createIfNotExists to ensure idempotency
      const result = await writeClient.createIfNotExists(doc);
      if (result._createdAt === result._updatedAt) {
        logSuccess(`Created ${doc._id}`);
        created++;
      } else {
        log(`Skipped ${doc._id} (already exists)`);
        skipped++;
      }
    } catch (error) {
      logError(`Failed to seed ${doc._id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      failed++;
    }
  }

  console.log(`\nTotal documents: ${allDocs.length}`);
  printSummary(created, updated, skipped, failed, isDryRun);
}

seed().catch((err) => {
  logError(`Fatal error: ${err.message}`);
  process.exit(1);
});
