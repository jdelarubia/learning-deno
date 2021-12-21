/**
 * This functionality requires --allow-read and --unstable flag enabled
 */

function run() {
  console.log("**************************************************");
  console.log("Web Workers API Demo");

  const path = new URL("./worker.ts", import.meta.url);
  const workerOptions: any = {
    type: "module",

    // the following code, enables the Deno namespace in the worker scope
    deno: {
      namespace: true,
    },
  };
  const worker = new Worker(path.href, workerOptions);
  const filePath = "./web-worker-api/log.txt"; // name of the file to be read and printed

  worker.postMessage({ filename: filePath });
  console.log();
} //.

export { run as demoWorkers };
