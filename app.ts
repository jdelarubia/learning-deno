/**
 * app.ts
 * Main application.
 */

import { permissionRepo } from './deps.ts';
import { DemosDetails } from './shared.ts';

async function runDemos() {
  console.log('Please, enable permissions so the demo app can work properly');
  await Deno.args.forEach((argument) => {
    const demo = DemosDetails[argument];
    if (demo) {
      const { fn, permissions } = demo;
      permissions.forEach((permission) => {
        permissionRepo.request(permission);
      });
      fn(); // run the demo
    }
  });
} //.

/**
 * Show a list of demos available to run. These are imported from shared.ts
 */
function showHelp() {
  console.log('Run some Deno demo apps.');
  console.log('USAGE:');
  console.log('  deno run app.ts [DEMO]');
  console.log('');
  console.log('DEMO:');
  for (const descriptor in DemosDetails) {
    const { description } = DemosDetails[descriptor];
    console.log(`  ${descriptor} : ${description}`);
  }
}

/**
 * Main app.
 * Check for arguments.
 * Show a list of demos and examples available, AND
 * run whichever functions we pass on via command-line arguments.
 */
async function main() {
  if (Deno.args.length > 0) {
    await runDemos();
  } else {
    showHelp();
    console.log('No arguments given.');
  }
} //.

main();
