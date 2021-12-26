/**
 * logger.ts
 */

const fh: Deno.File = await Deno.open("./ex-web-workers/session.txt", {
  create: true,
  write: true,
});

self.addEventListener("message", async (ev: Event): Promise<any> => {
  const { op } = (ev as any).data;
  await Deno.write(fh.rid, new TextEncoder().encode(op + "\n"));
});

self.addEventListener("createWorker", () => {
  console.log("creating Worker...");
});

self.addEventListener("closeWorker", () => {
  console.log("closing Worker...");
  Deno.close(fh.rid);
});
