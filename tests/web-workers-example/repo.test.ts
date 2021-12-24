/**
 * repo.test.ts
 * Test functions in the repository.
 */

import {
  assert,
  assertEquals,
  assertExists,
  assertNotEquals,
} from "../deps.ts";
import { productRepo } from "../../web-workers-example/repo.ts";
import {
  _Product,
  _RepoIndex,
  _Specs,
} from "../../web-workers-example/shared.ts";
import { fakeDB } from "./mocks.ts";

Deno.test({
  name: "productrepo. len() return 0 before init()",
  fn: () => {
    assertEquals(productRepo.len(), 0, "Initial len() must return 0");
  },
});

Deno.test({
  name: "productrepo. init() fills repo with test data",
  fn: () => {
    fakeDB.forEach((elem) => productRepo.add(elem));

    assertNotEquals(
      productRepo.len(),
      0,
      "len() must return a value greater than 0 after init",
    );
  },
});

Deno.test({
  name: "productrepo. find(1) return an element after init()",
  fn: () => {
    const elem: _Specs = productRepo.find(1);
    assertExists(elem, "find() must return some value after init()");
  },
});

Deno.test({
  name: "productrepo. findAll() return len > 1 after init()",
  fn: () => {
    assert(
      productRepo.findAll().length > 1,
      "repository doesn't seem to be initialized",
    );
  },
});

Deno.test({
  name: "productrepo. findBy() return an array of elements",
  fn: () => {
    assert(
      productRepo.findBy("category", "TV").length > 1,
      "repository doesn't seem to be initialized",
    );
  },
});

Deno.test({
  name: "productrepo. findBy() return 0 elements",
  fn: () => {
    assert(
      productRepo.findBy("something", "random").length === 0,
      "non existing filter",
    );
  },
});

Deno.test({
  name: "productrepo. add() a new element increment repo length",
  fn: () => {
    productRepo.add({
      specs: { category: "tablet", brand: "Samsung", price: 150 },
    });
    assertNotEquals(
      productRepo.len(),
      0,
      "len() must return a value greater than 0 after init",
    );
  },
});

Deno.test({
  name: "productrepo. remove() decrement repo length",
  fn: () => {
    const initLen: number = productRepo.len();
    productRepo.remove(2);
    const finalLen: number = productRepo.len();
    assert(finalLen < initLen, "remove() doesn't seem to subtract repo len");
  },
});

Deno.test({
  name: "productrepo. clear() set len() = 0",
  fn: () => {
    productRepo.clear();
    assertEquals(productRepo.len(), 0, "clear() must set len() to 0");
  },
});
