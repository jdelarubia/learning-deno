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
const all = (context: Context) => {
  context.response.body = {
    success: true,
    data: products,
  };
};

/**
 * @desc  Get a product
 * @route GET /api/v1/products/:id
 */
const one = (context: ContextWithParams) => {
  const { id } = context.params;
  const one: Product | undefined = products.find(
    (product) => product.id === id
  );
  if (one) {
    context.response.status = 200;
    context.response.body = {
      success: true,
      message: 'One retrieved ',
      id: id,
      data: one,
    };
    return;
  }
  context.response.status = 404;
  context.response.body = {
    success: false,
    message: `id ${id} not found`,
  };
};

/**
 * @desc  Add a product
 * @route POST /api/v1/products
 */
const add = (context: Context) => {
  context.response.body = {
    success: true,
    message: 'added product',
  };
};

/**
 * @desc  Update product
 * @route PUT /api/v1/products/:id
 */
const update = (context: Context) => {
  context.response.body = {
    success: true,
    message: 'updated product',
  };
};

/**
 * @desc  Delete a product
 * @route DELETE /api/v1/products/:id
 */
const remove = (context: Context) => {
  context.response.body = {
    success: true,
    message: 'deleted product',
  };
};

export { all, one, add, update, remove };
