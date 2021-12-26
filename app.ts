/**
 * app.ts
 * Main application.
 */

import { permissionRepo } from "./shared/PermissionRepository.ts";
import { demoPermissions } from "./permission-api/app.ts";
import { demoWebPlatform } from "./web-platform-api/app.ts";
import { demoHttpServer } from "./http-server-api/app.ts";
import { demoStorage } from "./web-storage-api/app.ts";
import { demoWorkers } from "./web-worker-api/app.ts";
import { demoSampleWorkers } from "./ex-web-workers/app.ts";

/**
 * Request all permissions needed to run our app.
 */
async function askPermissions() {
  const permissionDescriptors: Deno.PermissionDescriptor[] = [
    { name: "read", path: "./web-platform-api/albums.json" },
    { name: "read", path: "./web-worker-api/worker.ts" },
    { name: "read", path: "./web-worker-api/log.txt" },
    { name: "write", path: "./output.txt" },
    { name: "net", host: "127.0.0.1:8080" },
    { name: "net", host: "localhost:8080" },
    { name: "read", path: "./ex-web-workers/logger.ts" },
    { name: "write", path: "./ex-web-workers/session.txt" },
  ];
  console.log("Please, enable permissions so the demo app can work");
  await permissionDescriptors.forEach((descriptor) => {
    permissionRepo.request(descriptor);
  });
} //.

type _MenuElements = {
  [index: string]: { fn: CallableFunction; desc?: string };
};
const supportedFunctions: _MenuElements = {
  permissions: { fn: demoPermissions, desc: "Demo Deno Permissions API" },
  web: { fn: demoWebPlatform, desc: "Demo Deno Web Platform API" },
  http: {
    fn: demoHttpServer,
    desc: "Demo HTTP server API (blocks the process)",
  },
  storage: { fn: demoStorage, desc: "Demo Deno Local Storage API" },
  workers: { fn: demoWorkers, desc: "Demo Deno Worker API" },
  exworker: {
    fn: demoSampleWorkers,
    desc: "Demo app of Worker + Local Storage + Permissions",
  },
};

/**
 * Main app.
 * Check for arguments.
 * Show a list of demos and examples available, AND
 * run whichever functions we pass on via command-line arguments.
 */
async function main() {
  if (Object.keys(Deno.args).length > 0) {
    await askPermissions();
    console.log("Demos available:");
    for (const fun in supportedFunctions) {
      const { desc } = supportedFunctions[fun];
      console.log(fun, ":", desc);
    }

    for (const fun of Deno.args) {
      const { fn } = supportedFunctions[fun];
      await fn();
    }
  }
} //.

main();
