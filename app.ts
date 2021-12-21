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
import { demoSampleWorkers } from "./web-workers-example/app.ts";

// Request all permissions needed to run our app
async function askPermissions() {
  const permissionDescriptors: any[] = [
    { name: "read", path: "./web-platform-api/albums.json" },
    { name: "read", path: "./web-worker-api/worker.ts" },
    { name: "read", path: "./web-worker-api/log.txt" },
    { name: "write", path: "./output.txt" },
    { name: "net", host: "127.0.0.1:8080" },
    { name: "net", host: "localhost:8080" },
    { name: "read", path: "./web-workers-example/logger.ts" },
    { name: "write", path: "./web-workers-example/session.txt" },
  ];
  console.log("Please, enable permissions so the demo app can work");
  await permissionDescriptors.forEach((descriptor) => {
    permissionRepo.request(descriptor);
  });
} //.

// Run all the demos
await askPermissions();
await demoPermissions();
await demoWebPlatform();
// await demoHttpServer(); // blocks the execution running a web server
await demoStorage();
await demoWorkers();
await demoSampleWorkers();
