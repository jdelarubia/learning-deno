/**
 * permissionsrepo.test.ts
 * Test functions in the repository.
 */

import { assertEquals } from "../deps.ts";
import { permissionRepo } from "../../shared/PermissionRepository.ts";

const readPermissionDescriptor: Deno.PermissionDescriptor = {
  name: "read",
  path: "./tests/permissions-api/log.txt",
};

Deno.test({
  name:
    "permissionrepo. query() on a non --allow-read flagged file return prompt",
  fn: async () => {
    const p = await permissionRepo.query(readPermissionDescriptor);
    assertEquals(
      p.state,
      "prompt",
      "query() non --allow-read flagged file should return prompt by default",
    );
  },
});

Deno.test({
  name:
    "permissionrepo. isGranted() on a non --allow-read flagged file return false",
  fn: async () => {
    const p: boolean = await permissionRepo.isGranted(readPermissionDescriptor);
    assertEquals(
      p,
      false,
      "isGranted() o a non --allow-read flagged file should return false",
    );
  },
});
