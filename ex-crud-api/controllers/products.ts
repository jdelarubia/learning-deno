/**
 * products.ts
 * Module that interface with our products.
 */

import { Context } from 'https://deno.land/x/oak@v10.6.0/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

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
const add = async (context: Context) => {
  const body = await context.request.body();
  console.log('body', await body);
  console.log('');
  if (!context.request.hasBody || Object.entries(body).length === 0) {
    context.response.status = 400;
    context.response.body = {
      success: false,
      message: 'missing data',
    };
    return;
  }
  const newProduct: Product = await body.value;
  newProduct.id = v4.generate();
  products.push(newProduct);

  context.response.status = 201;
  context.response.body = {
    success: true,
    data: newProduct,
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
