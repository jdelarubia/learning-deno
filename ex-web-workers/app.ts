/**
 * app.ts
 * Main application.
 */

import { _Descriptor, permissionRepo } from "../shared/PermissionRepository.ts";
import { CommandHandler } from "./commandHandler.ts";
import {
  _CommandReturn,
  _DenoWorkerOptions,
  _Product,
  _RepoIndex,
  _Specs,
} from "./shared.ts";

const handler = new CommandHandler();
let _WORKER: Worker | null = null;

function buildUp() {
  const path: URL = new URL("./logger.ts", import.meta.url);
  const options: WorkerOptions | _DenoWorkerOptions = {
    type: "module",
    // the following code, enables the Deno namespace in the worker scope
    deno: {
      namespace: true,
    },
    write: ["./ex-web-workers/session.txt"],
  } as WorkerOptions;

  _WORKER = new Worker(path.href, options);
  handler.initWorker(_WORKER);
} //.

function tearDown() {
  _WORKER!.terminate();
  handler.clear();
} //.

function getUserCommand(): string {
  return prompt("Command > ") || "";
} //.

function handleUserInput() {
  console.log(handler.help());

  while (!handler.exit) {
    const [command, ...args] = getUserCommand().trim().split(" ");
    handler.handle(command, args);
  }
} //.

/**
 * It needs to be run with --unstable flag.
 */
async function run() {
  console.log("**************************************************");
  console.log("Web Workers Example Demo");

  const writePermission: _Descriptor = {
    name: "write",
    path: "./ex-web-workers/session.txt",
  };

  if (!(await permissionRepo.isGranted(writePermission))) {
    console.log("App required permissions NOT MET. Exiting...");
    return;
  }

  await buildUp();
  // user interaction UI module
  handleUserInput();
  tearDown();
} //.

export { run as demoSampleWorkers };
