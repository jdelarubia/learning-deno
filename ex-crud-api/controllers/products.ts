/**
 * products.ts
 * Module that interface with our products.
 */

import { Context } from 'https://deno.land/x/oak@v10.6.0/mod.ts';

import { fakeDB } from './db.ts';
import { Product, OptionalProduct, ContextWithParams } from '../types.ts';

/**
 * @desc  Get all products
 * @route GET /api/v1/products
 */
const all = (context: Context) => {
  context.response.body = {
    success: true,
    data: fakeDB.all(),
  };
};

/**
 * @desc  Get a product
 * @route GET /api/v1/products/:id
 */
const one = (context: ContextWithParams) => {
  const { id } = context.params;
  const one: OptionalProduct | undefined = fakeDB.one(id as string);
  if (one) {
    context.response.status = 200;
    context.response.body = {
      success: true,
      message: 'product retrieved ',
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
    context.response.status = 400; // bad request
    context.response.body = {
      success: false,
      message: 'missing data',
    };
    return;
  }
  const newProduct: OptionalProduct = await body.value;
  fakeDB.add(newProduct);

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
const update = async (context: Context) => {
  const { params, request, response } = context as any;
  const product: OptionalProduct | undefined = fakeDB.one(params.id);
  console.log('product found', product);

  if (product) {
    const body = await request.body();
    const updatedData: OptionalProduct = await body.value;
    updatedData.id = params.id;
    console.log('updating product 2:', updatedData);
    fakeDB.update(updatedData);

    context.response.status = 200;
    context.response.body = {
      success: true,
      message: 'updated product',
      data: updatedData,
    };
    return;
  }
  context.response.status = 404;
  context.response.body = {
    success: false,
    message: `product ${params.id} not found`,
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
