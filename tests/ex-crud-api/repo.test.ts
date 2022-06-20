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
import { fakeDB } from '../../ex-crud-api/controllers/db.ts';
import { OptionalProduct } from '../../ex-crud-api/types.ts';

Deno.test({
  name: 'productRepo. accessing a non existing product return undefined',
  fn: () => {
    assertEquals(fakeDB.one('100'), undefined);
  },
});

Deno.test({
  name: 'productRepo. len() of initial DB length is 3',
  fn: () => {
    assertEquals(fakeDB.len(), 3, 'Initial len() must be 3 elements');
  },
});

Deno.test({
  name: 'productRepo. all() return an array of Products and initial names match',
  fn: () => {
    const allProducts = fakeDB.all();
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
      fakeDB.one('2')?.name,
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
    const newId = fakeDB.add(exampleProduct);
    assertEquals(fakeDB.len(), 4);
    assertEquals(fakeDB.one(newId)?.name, 'Product Four');
  },
});
