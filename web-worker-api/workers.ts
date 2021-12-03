/**
 * This functionality requires --allow-read and --unstable flag enabled
 */

function sampleWorkers() {
  const path = new URL("./worker.ts", import.meta.url);
  const options: any = {
    type: "module",

    // the following code, enables the Deno namespace in the worker scope
    deno: {
      namespace: true,
    },
  };
  const worker = new Worker(path.href, options);
  const filePath = "./web-worker-api/log.txt"; // name of the file to be read and printed

  worker.postMessage({ filename: filePath });
} //.

export { sampleWorkers };
