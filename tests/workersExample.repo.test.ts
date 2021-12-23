import {
  assert,
  assertEquals,
  assertNotEquals,
  assertExists,
} from "https://deno.land/std@0.118.0/testing/asserts.ts";
import { productRepo } from "../web-workers-example/repo.ts";
import { _Product, _RepoIndex, _Specs } from "../web-workers-example/shared.ts";

Deno.test({
  name: "len() return 0 before init()",
  fn: () => {
    assertEquals(productRepo.len(), 0, "Initial len() must return 0");
  },
});

Deno.test({
  name: "init() fills repo with test data",
  fn: () => {
    [
      { specs: { category: "TV", brand: "LG", price: 300 } },
      { specs: { category: "TV", brand: "Samsung", price: 400 } },
      { specs: { category: "TV", brand: "Sony", price: 500 } },
      { specs: { category: "TV", brand: "Xiaomi", price: 300 } },
      { specs: { category: "mobile", brand: "Samsung", price: 700 } },
      { specs: { category: "mobile", brand: "Apple", price: 3000 } },
    ].forEach((elem) => productRepo.add(elem));

    assertNotEquals(
      productRepo.len(),
      0,
      "len() must return a value greater than 0 after init"
    );
  },
});

Deno.test({
  name: "find(1) return an element after init()",
  fn: () => {
    const elem: _Specs = productRepo.find(1);
    assertExists(elem, "find() must return some value after init()");
  },
});

Deno.test({
  name: "findAll() return len > 1 after init()",
  fn: () => {
    assert(
      productRepo.findAll().length > 1,
      "repository doesn't seem to be initialized"
    );
  },
});

Deno.test({
  name: "findBy() return an array of elements",
  fn: () => {
    assert(
      productRepo.findBy("category", "TV").length > 1,
      "repository doesn't seem to be initialized"
    );
  },
});

Deno.test({
  name: "findBy() return 0 elements",
  fn: () => {
    assert(
      productRepo.findBy("something", "random").length === 0,
      "non existing filter"
    );
  },
});

Deno.test({
  name: "add() a new element increment repo length",
  fn: () => {
    productRepo.add({
      specs: { category: "tablet", brand: "Samsung", price: 150 },
    });
    assertNotEquals(
      productRepo.len(),
      0,
      "len() must return a value greater than 0 after init"
    );
  },
});

Deno.test({
  name: "remove() decrement repo length",
  fn: () => {
    const initLen: number = productRepo.len();
    productRepo.remove(2);
    const finalLen: number = productRepo.len();
    assert(finalLen < initLen, "remove() doesn't seem to subtract repo len");
  },
});

Deno.test({
  name: "clear() set len() = 0",
  fn: () => {
    productRepo.clear();
    assertEquals(productRepo.len(), 0, "clear() must set len() to 0");
  },
});
