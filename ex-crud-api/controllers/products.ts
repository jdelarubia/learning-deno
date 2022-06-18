/**
 * products.ts
 * Module that interface with our products.
 */

import { Context } from 'https://deno.land/x/oak@v10.6.0/mod.ts';

import { products } from './data.ts';
import { Product, ContextWithParams } from '../types.ts';

/**
 * @desc  Get all products
 * @route GET /api/v1/products
 */
const findAll = (context: Context) => {
  context.response.body = {
    success: true,
    data: products,
  };
};

export { findAll };
