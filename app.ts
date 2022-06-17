/**
 * app.ts
 * Main application.
 */

import { permissionRepo } from './deps.ts';
import { DemosDetails } from './shared.ts';

async function runDemos() {
  console.log('Please, enable permissions so the demo app works');
  await Deno.args.forEach((argument) => {
    const demo = DemosDetails[argument];
    if (demo) {
      const { fn, permissions } = demo;
      permissions.forEach((permission) => {
        permissionRepo.request(permission);
      });
      fn();
    }
  });
} //.

function showDemosAvailable() {
  console.log('Demos available:');
  for (const descriptor in DemosDetails) {
    const { description } = DemosDetails[descriptor];
    console.log(descriptor, ':', description);
  }
} //.

/**
 * Main app.
 * Check for arguments.
 * Show a list of demos and examples available, AND
 * run whichever functions we pass on via command-line arguments.
 */
async function main() {
  // await console.log(DemosDetails);

  showDemosAvailable();
  if (Deno.args.length > 0) {
    await runDemos();
  } else {
    console.log('No arguments were given. Exit!');
  }

  // if (Object.keys(Deno.args).length > 0) {
  //   await askPermissions();
  //   console.log("Demos available:");
  //   for (const fun in supportedFunctions) {
  //     const { desc } = supportedFunctions[fun];
  //     console.log(fun, ":", desc);
  //   }

  //   for (const fun of Deno.args) {
  //     const { fn } = supportedFunctions[fun];
  //     await fn();
  //   }
  // }
} //.

main();
