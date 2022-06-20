/**
 * types.ts
 * Helper types
 */

import { Context } from 'https://deno.land/x/oak@v10.6.0/mod.ts';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
};
type OptionalProduct = {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
};

type ContextWithParams = Context & { params: { [index: string]: unknown } };

export type { Product, OptionalProduct, ContextWithParams };
