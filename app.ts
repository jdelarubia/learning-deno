import { sampleWeb } from "./web-platform-api/web.ts";
import { launchServer } from "./http-server-api/server.ts";
import { samplePermissions } from "./permission-api/permission.ts";
import { sampleStorage } from "./web-storage-api/storage.ts";
import { sampleWorkers } from "./web-worker-api/workers.ts";

await samplePermissions();
await sampleWeb();
await launchServer();
await sampleStorage();
sampleWorkers();
