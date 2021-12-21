// import { requestPermission } from "../permission-api/permission.ts";
import { _Descriptor, permissionRepo } from "../shared/PermissionRepository.ts";

// Settings
const PORT = 8080;
const HOST = "127.0.0.1";

async function requestNetAccess(): Promise<boolean> {
  const descriptor: _Descriptor = {
    name: "net",
    host: `${HOST}:${PORT}`,
  } as const;
  const status = await permissionRepo.query(descriptor);
  return permissionRepo.isGranted(descriptor);
} //.

// Info about HTTP Requests and Responses
// https://deno.land/manual@v1.16.3/runtime/http_server_apis
async function run() {
  console.log("**************************************************");
  console.log("HTTP Server API Demo");
  console.log(
    `If you grant NET permissions, the server will listen on http://${HOST}:${PORT}`
  );

  if (await requestNetAccess()) {
    const options: Deno.ListenOptions = { port: PORT, hostname: HOST };
    const server: Deno.Listener = await Deno.listen(options);

    for await (const conn of server) {
      handle(conn);
    }
  }
  console.log();
} //.

/**
 * HELPER
 * * NOTE This method throws an Exception if method is other than GET.
 * @param conn : Deno.Conn
 */
async function handle(conn: Deno.Conn) {
  const httpConnection: Deno.HttpConn = Deno.serveHttp(conn);

  for await (const requestEvent of httpConnection) {
    console.log(requestEvent);
    const { method, redirect, url } = requestEvent.request;
    console.log(method, redirect, url);
    const path = new URL(requestEvent.request.url);
    const strResponse = `request from url: ${path.pathname}`;
    const response = new Response(strResponse, { status: 200 });
    console.log(strResponse);

    await requestEvent.respondWith(response);
  }
} //.

export { run as demoHttpServer };
