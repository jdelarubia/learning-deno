/**
 * shared.ts
 * Common types and utilities shared across the app.
 */

import {
  demoHttpServer,
  demoPermissions,
  demoSampleWorkers,
  demoStorage,
  demoUnixCat,
  demoWebPlatform,
  demoWorkers,
  demoCrudApi,
} from './deps.ts';

type DemoDescriptor = {
  fn: CallableFunction;
  description: string;
  permissions: Deno.PermissionDescriptor[];
};
type DemoList = { [index: string]: DemoDescriptor };

const permitDescriptor: DemoDescriptor = {
  fn: demoPermissions,
  description: 'Demo Deno Permissions API',
  permissions: [],
};
const catDescriptor: DemoDescriptor = {
  fn: demoUnixCat,
  description: 'Demo Deno Permissions API',
  permissions: [
    { name: 'read', path: './ex-unix-cat/passwords.txt' },
    { name: 'read', path: './ex-unix-cat/devices.txt' },
  ],
};
const webDescriptor: DemoDescriptor = {
  fn: demoWebPlatform,
  description: 'Demo Deno Web Platform API',
  permissions: [{ name: 'read', path: './web-platform-api/albums.json' }],
};

const httpDescriptor: DemoDescriptor = {
  fn: demoHttpServer,
  description: 'Demo HTTP server API (blocks the process)',
  permissions: [
    { name: 'net', host: '127.0.0.1:8080' },
    { name: 'net', host: 'localhost:8080' },
  ],
};
const storageDescriptor: DemoDescriptor = {
  fn: demoStorage,
  description: 'Demo Deno Local Storage API',
  permissions: [],
};
const workerDescriptor: DemoDescriptor = {
  fn: demoWorkers,
  description: 'Demo Deno Worker API',
  permissions: [
    { name: 'read', path: './web-worker-api/worker.ts' },
    { name: 'read', path: './web-worker-api/log.txt' },
  ],
};
const exworkerDescriptor: DemoDescriptor = {
  fn: demoSampleWorkers,
  description: 'Demo app of Worker + Local Storage + Permissions',
  permissions: [
    { name: 'read', path: './ex-web-workers/logger.ts' },
    { name: 'write', path: './ex-web-workers/session.txt' },
  ],
};
const excrudapi: DemoDescriptor = {
  fn: demoCrudApi,
  description: 'Traversy Media Example of CRUD API',
  permissions: [
    { name: 'net', host: '127.0.0.1:8080' },
    { name: 'net', host: 'localhost:8080' },
  ],
};

export const DemosDetails: DemoList = {
  permit: permitDescriptor,
  http: httpDescriptor,
  web: webDescriptor,
  cat: catDescriptor,
  workers: workerDescriptor,
  storage: storageDescriptor,
  exworker: exworkerDescriptor,
  excrudapi: excrudapi,
};
