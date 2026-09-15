export function log(msg: string) {
  console.log(`ℹ️ ${msg}`);
}

export function logSuccess(msg: string) {
  console.log(`✅ ${msg}`);
}

export function logWarning(msg: string) {
  console.log(`⚠️ ${msg}`);
}

export function logError(msg: string) {
  console.error(`❌ ${msg}`);
}

export function printSummary(created: number, updated: number, skipped: number, failed: number, isDryRun: boolean) {
  console.log(`\n--------------------------------`);
  console.log(`Created: ${created}`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Failed:  ${failed}`);
  console.log(`--------------------------------\n`);
  
  if (isDryRun) {
    console.log(`✅ DRY RUN — no changes made.`);
  } else {
    console.log(`✅ CMS bootstrap completed successfully.`);
  }
}
