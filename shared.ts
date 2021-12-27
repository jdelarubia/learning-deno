/**
 * shared.ts
 * Common types and utilities shared acrros the app.
 */

import {
  demoHttpServer,
  demoPermissions,
  demoSampleWorkers,
  demoStorage,
  demoUnixCat,
  demoWebPlatform,
  demoWorkers,
} from "./deps.ts";

type _DemoDescriptor = {
  fn: CallableFunction;
  description: string;
  permissions: Deno.PermissionDescriptor[];
};

const permitDescriptor: _DemoDescriptor = {
  fn: demoPermissions,
  description: "Demo Deno Permissions API",
  permissions: [],
};
const catDescriptor: _DemoDescriptor = {
  fn: demoUnixCat,
  description: "Demo Deno Permissions API",
  permissions: [
    { name: "read", path: "./ex-unix-cat/passwords.txt" },
    { name: "read", path: "./ex-unix-cat/devices.txt" },
  ],
};
const webDescriptor: _DemoDescriptor = {
  fn: demoWebPlatform,
  description: "Demo Deno Web Platform API",
  permissions: [{ name: "read", path: "./web-platform-api/albums.json" }],
};

const httpDescriptor: _DemoDescriptor = {
  fn: demoHttpServer,
  description: "Demo HTTP server API (blocks the process)",
  permissions: [
    { name: "net", host: "127.0.0.1:8080" },
    { name: "net", host: "localhost:8080" },
  ],
};
const storageDescriptor: _DemoDescriptor = {
  fn: demoStorage,
  description: "Demo Deno Local Storage API",
  permissions: [],
};
const workerDescriptor: _DemoDescriptor = {
  fn: demoWorkers,
  description: "Demo Deno Worker API",
  permissions: [
    { name: "read", path: "./web-worker-api/worker.ts" },
    { name: "read", path: "./web-worker-api/log.txt" },
  ],
};
const exworkerDescriptor: _DemoDescriptor = {
  fn: demoSampleWorkers,
  description: "Demo app of Worker + Local Storage + Permissions",
  permissions: [
    { name: "read", path: "./ex-web-workers/logger.ts" },
    { name: "write", path: "./ex-web-workers/session.txt" },
  ],
};

export const DemosDetails: { [index: string]: _DemoDescriptor } = {
  permit: permitDescriptor,
  http: httpDescriptor,
  web: webDescriptor,
  cat: catDescriptor,
  workers: workerDescriptor,
  storage: storageDescriptor,
  exworker: exworkerDescriptor,
};
