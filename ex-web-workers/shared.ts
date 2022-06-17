/**
 * shared.ts
 * Custom types and utility functions.
 */

export type _DenoWorkerOptions = { deno?: { [index: string]: boolean } };
export type _CommandReturn = (args: string) => boolean;
export type _RepoIndex = string | number;
export type _Specs = { [feature: string]: string | number };
export type _Product = {
  id?: number;
  specs: _Specs;
};

const isBoolean = (val: string | boolean): boolean => {
  return typeof val === 'boolean';
}; //.

export { isBoolean };
