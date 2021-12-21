import {
  assertEquals,
  assertNotEquals,
  assertExists,
} from "https://deno.land/std@0.118.0/testing/asserts.ts";
import { productRepo } from "../web-workers-example/repo.ts";
import { _Product, _RepoIndex, _Specs } from "../web-workers-example/shared.ts";

Deno.test({
  name: "Set Up",
  fn: () => {
    assertEquals(productRepo.len(), 0, "Initial len() must return 0");
  },
});

Deno.test({
  name: "Initializes repo with sample data",
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
  name: "find() an id after init()",
  fn: () => {
    const elem: _Specs = productRepo.find(1);
    assertExists(elem, "find() must return some value after init()");
  },
});

Deno.test({
  name: "Add a new element",
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
  name: "Tear down",
  fn: () => {
    productRepo.clear();
    assertEquals(productRepo.len(), 0, "clear() must set len() to 0");
  },
});
