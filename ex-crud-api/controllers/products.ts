/**
 * products.ts
 * Module that interface with our products.
 */

import { Context } from 'https://deno.land/x/oak@v10.6.0/mod.ts';
import { Client } from 'https://deno.land/x/postgres@v0.16.1/mod.ts';

import { productsRepo } from './db.ts';
import { ContextWithParams, Product } from '../types.ts';
import { dbCreds } from '../config.ts';

// init db client
const client = new Client(dbCreds);
await client.connect();

/**
 * @desc  Get all products
 * @route GET /api/v1/products
 */
const all = async (context: Context) => {
  try {
    const result = await client.queryObject({
      text: `SELECT * from ${dbCreds.database};`,
    });
    context.response.body = {
      success: true,
      data: result.rows,
    };
  } catch (error) {
    context.response.body = {
      success: false,
      message: error.toString(),
    };
  }
};

/**
 * @desc  Get a product
 * @route GET /api/v1/products/:id
 */
const one = (context: ContextWithParams) => {
  const { id } = context.params;
  const one: Product | undefined = productsRepo.find(id as string);
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
  try {
    const newProduct: Product = await body.value;
    await client.connect();
    const result = await client.queryObject({
      args: {
        name: newProduct?.name,
        description: newProduct?.description,
        price: newProduct?.price,
      },
      text: `INSERT INTO ${dbCreds.database} (name, description, price) VALUES($name, $description, $price);`,
    });
    context.response.status = 201;
    context.response.body = {
      success: true,
      data: newProduct,
    };
  } catch (error) {
    context.response.status = 500;
    context.response.body = {
      success: false,
      message: error.toString(),
    };
  } finally {
    await client.end();
  }
};

/**
 * @desc  Update product
 * @route PUT /api/v1/products/:id
 */
const update = async (context: Context) => {
  const { params, request } = context as any;
  const product: Product | undefined = productsRepo.find(params.id);
  console.log('product found', product);

  if (product) {
    const body = await request.body();
    const updatedData: Product = await body.value;
    updatedData.id = params.id;
    console.log('updating product 2:', updatedData);
    productsRepo.update(updatedData);

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
  const { params } = context as any;

  productsRepo.remove(params.id);

  context.response.body = {
    success: true,
    message: `product id ${params.id} removed`,
  };
};

export { add, all, one, remove, update };
