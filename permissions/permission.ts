const descriptors: { [index: string]: Deno.PermissionDescriptor } = {
    read: { name: "read" },
    write: { name: "write" },
    net: { name: "net" },
    env: { name: "env" },
    hrtime: { name: "hrtime" },
    run: { name: "run" },
    ffi: { name: "ffi" },
};

/**
 * HELPER
 * @param permissionDescriptor Deno.PermissionDescriptor
 * @returns Promise<Deno.PermissionStatus>
 */
async function checkCurrentPermission(
    permissionDescriptor: Deno.PermissionDescriptor
): Promise<Deno.PermissionStatus> {
    return await Deno.permissions.query(permissionDescriptor);
} //.

/**
 * Console log all current permission of our app.
 */
async function logCurrentPermissions() {
    console.log("*** logging current permissions ***");

    for (const descriptor in descriptors) {
        const query = await checkCurrentPermission(descriptors[descriptor]);
        console.log(`${descriptor}: `, query);
    }
    console.log();
} //.

/**
 * Sample changing permissions on the fly by prompting the user.
 */
async function requestPermission() {
    console.log("*** requesting to change a permission ***");
    const descriptor = {
        name: "write",
        path: "./output.txt",
    } as const;
    const before = await checkCurrentPermission(descriptor);
    console.log("permissions before prompting the user:", before);
    const status = await Deno.permissions.request(descriptor);
    console.log("permissions AFTER prompting the user:", status);
    console.log();
} //.

/**
 * Test revoking permissions by prompting the user
 */
async function revokePermission() {
    console.log("*** Revoking a permission ***");
    console.log(
        "Try running this program with the flag --allow-net enabled to see it revoked"
    );
    const descriptor = { name: "net", host: "127.0.0.1" } as const;
    const before = await checkCurrentPermission(descriptor);
    console.log("permissions before prompting the user:", before);
    const status = await Deno.permissions.revoke(descriptor);
    console.log("permissions AFTER prompting the user:", status);
    console.log();
} //.

/**
 * Main functionality to run all our sample code.
 */
async function samplePermissions() {
    await logCurrentPermissions();
    await requestPermission();
    await revokePermission();
} //.

export { samplePermissions };
