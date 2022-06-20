/**
 * db.test.ts
 * Test our sample product's repository functionality.
 */

import {
  assert,
  assertEquals,
  assertExists,
  assertNotEquals,
} from '../deps.ts';
import { productsRepo } from '../../ex-crud-api/controllers/db.ts';
import { OptionalProduct } from '../../ex-crud-api/types.ts';

Deno.test({
  name: 'productRepo. accessing a non existing product return undefined',
  fn: () => {
    assertEquals(productsRepo.find('100'), undefined);
  },
});

Deno.test({
  name: 'productRepo. len() of initial DB length is 3',
  fn: () => {
    assertEquals(productsRepo.len(), 3, 'Initial len() must be 3 elements');
  },
});

Deno.test({
  name: 'productRepo. all() return an array of Products and initial names match',
  fn: () => {
    const allProducts = productsRepo.findAll();
    assertEquals(allProducts.length, 3);
    assertEquals(allProducts[0].name, 'Product One');
    assertEquals(allProducts[1].name, 'Product Two');
    assertEquals(allProducts[2].name, 'Product Three');
  },
});

Deno.test({
  name: 'productRepo. one(2).name() must be "Product Two"',
  fn: () => {
    assertEquals(
      productsRepo.find('2')?.name,
      'Product Two',
      "2nd product in DB doesn't seem right"
    );
  },
});

Deno.test({
  name: 'productRepo. add() alter the DB length and name matches',
  fn: () => {
    const exampleProduct: OptionalProduct = {
      name: 'Product Four',
      description: 'Fourth product in our catalogue',
      price: 75.55,
    };
    const newId = productsRepo.add(exampleProduct);
    assertEquals(productsRepo.len(), 4);
    assertEquals(productsRepo.find(newId)?.name, 'Product Four');
  },
});

Deno.test({
  name: 'productRepo. update() change the name of product',
  fn: () => {
    const initialName: string | undefined = productsRepo.find('2')?.name;
    const exampleProduct: OptionalProduct = {
      name: 'Updated Product TWO',
      description: 'Fourth product in our catalogue',
      price: 75.55,
    };
    productsRepo.update(exampleProduct);
    const updatedName: string | undefined = productsRepo.find('2')?.name;
    console.log('names:', initialName, updatedName);
    assertEquals(productsRepo.len(), 4);
    assertNotEquals(initialName, updatedName);
  },
});

Deno.test({
  name: 'productRepo. remove() change DB length',
  fn: () => {
    productsRepo.remove('2');
    assertEquals(productsRepo.len(), 3);
  },
});
