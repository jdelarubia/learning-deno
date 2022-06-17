/**
 * PermissionHandler.ts
 * Handles regular Deno permissions (except unstable) of our application.
 *
 * Example:
 * const readPermission: Deno.PermissionDescriptor = { name: "read", path: "./worker.ts" };
 * const permissionHandler = new PermissionHandler(readPermission);
 * if (await permissionHandler.isGranted()) {
 * // do something
 * }
 */

type _Descriptor = Deno.PermissionDescriptor;
type _Status = Deno.PermissionStatus;

class PermissionRepository {
  private static instance: PermissionRepository;

  constructor() {} //.

  public static getInstance(): PermissionRepository {
    if (!PermissionRepository.instance) {
      PermissionRepository.instance = new PermissionRepository();
    }
    return PermissionRepository.instance;
  } //.

  /**
   * Query permissions set in this.descriptor.
   * @returns Promise<Deno.PermissionStatus>
   */
  async query(descriptor: _Descriptor): Promise<_Status> {
    return await Deno.permissions.query(descriptor as _Descriptor);
  } //.

  /**
   * Request if this.descriptor is enabled.
   * @returns Promise<Deno.PermissionStatus>
   */
  async request(descriptor: _Descriptor): Promise<_Status> {
    return await Deno.permissions.request(descriptor as _Descriptor);
  } //.

  /**
   * Revoke the set of permissions in this.descriptor.
   * @returns Promise<Deno.PermissionStatus>
   */
  async revoke(descriptor: _Descriptor): Promise<_Status> {
    return await Deno.permissions.revoke(descriptor as _Descriptor);
  } //.

  /**
   * Return true if user has granted this.descriptor.
   * @returns Promise<boolean>
   */
  async isGranted(descriptor: _Descriptor): Promise<boolean> {
    return (await (await this.query(descriptor)).state) === 'granted';
  } //.
} //. PermissionHandler

const permissionRepo = PermissionRepository.getInstance();

export { permissionRepo };
export type { _Descriptor, _Status };
