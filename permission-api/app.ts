import { _Descriptor, permissionRepo } from "../shared/PermissionRepository.ts";

const descriptors: { [index: string]: _Descriptor } = {
  read: { name: "read" },
  write: { name: "write" },
  net: { name: "net" },
  env: { name: "env" },
  hrtime: { name: "hrtime" },
  run: { name: "run" },
  ffi: { name: "ffi" },
};

/**
 * Console log all current permission of our app.
 */
async function logCurrentPermissions() {
  console.log("*** log all current system permissions ***");

  for (const descriptor in descriptors) {
    console.log(
      `${descriptor}: `,
      await permissionRepo.query(descriptors[descriptor])
    );
  }
  console.log();
} //.

/**
 * Sample changing permissions on the fly by prompting the user.
 */
async function sampleRequestPermission() {
  console.log("*** requesting to change a permission ***");
  const descriptor = {
    name: "write",
    path: "./output.txt",
  } as const;

  const before = await permissionRepo.query(descriptor);
  console.log("permissions before prompting the user:", before);
  const after = await permissionRepo.request(descriptor);
  console.log("permissions AFTER prompting the user:", after);
  console.log();
} //.

/**
 * Test revoking permissions by prompting the user
 */
async function sampleRevokePermission() {
  console.log("*** Revoking a permission ***");
  console.log(
    "Try running this program with the flag --allow-net enabled to see it revoked"
  );
  const descriptor = { name: "net", host: "127.0.0.1" } as const;

  const before = await permissionRepo.query(descriptor);
  console.log("permissions before prompting the user:", before);
  const after = await permissionRepo.revoke(descriptor);
  console.log("permissions AFTER prompting the user:", after);
  console.log();
} //.

/**
 * Main functionality to run all our sample code.
 */
async function run() {
  console.log("**************************************************");
  console.log("Permissions API Demo");

  await logCurrentPermissions();
  await sampleRequestPermission();
  await sampleRevokePermission();
  console.log();
} //.

export { run as demoPermissions };
