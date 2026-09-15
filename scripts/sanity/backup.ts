import { mkdir, chmod } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import dotenv from 'dotenv';

async function main() {
dotenv.config({ path: '.env.local', quiet: true });
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
if (!dataset || !/^[a-z0-9_-]+$/.test(dataset)) throw new Error('Set a valid NEXT_PUBLIC_SANITY_DATASET.');

await mkdir('backups', { recursive: true, mode: 0o700 });
const destination = `backups/${dataset}-${new Date().toISOString().replace(/[:.]/g, '-')}.tar.gz`;
const result = spawnSync('pnpm', ['exec', 'sanity', 'dataset', 'export', dataset, destination], {
  stdio: 'inherit',
});
if (result.status !== 0) process.exit(result.status ?? 1);
await chmod(destination, 0o600);
console.log(`Backup saved to ${destination}. Store an encrypted off-machine copy before launch.`);

}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
