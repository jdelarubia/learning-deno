import { sampleWeb } from "./web-platform-api/web.ts";
import { launchServer } from "./http-server-api/server.ts";
import { samplePermissions } from "./permission-api/permission.ts";

await samplePermissions();
await sampleWeb();
await launchServer();
