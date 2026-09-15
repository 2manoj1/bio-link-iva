import { instagramStatsData } from "./data/instagram-stats";
import { mediaKitData } from "./data/media-kit";
import { premiumExperiencesData } from "./data/premium-experiences";
import { log, logError, logSuccess } from "./utils/logger";

function validateDocument(doc: { _id?: string; _type?: string }) {
  const errors: string[] = [];
  
  if (!doc._id) {
    errors.push("Missing _id");
  }
  
  if (!doc._type) {
    errors.push("Missing _type");
  }
  
  return errors;
}

async function validate() {
  log("Starting pre-flight validation...");
  const allDocs = [
    instagramStatsData,
    mediaKitData,
    ...premiumExperiencesData
  ];

  let hasErrors = false;
  const ids = new Set<string>();

  for (const doc of allDocs) {
    const errors = validateDocument(doc);
    if (doc._id) {
      if (ids.has(doc._id)) {
        errors.push(`Duplicate _id found: ${doc._id}`);
      }
      ids.add(doc._id);
    }

    if (errors.length > 0) {
      logError(`Validation failed for ${doc._id || 'unknown'}:`);
      errors.forEach(e => console.error(`  - ${e}`));
      hasErrors = true;
    }
  }

  if (hasErrors) {
    logError("Validation failed. Please fix the issues before seeding.");
    process.exit(1);
  }

  logSuccess("Validation passed. Ready for seed.");
}

validate().catch(console.error);
