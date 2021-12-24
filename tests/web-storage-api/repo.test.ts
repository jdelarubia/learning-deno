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
import { heroRepository } from "../../web-storage-api/heroRepository.ts";
import { fakeDB } from "./mocks.ts";

Deno.test({
  name: "herorepo. len() return 0 before init()",
  fn: () => {
    assertEquals(heroRepository.len(), 0, "Initial len() must return 0");
  },
});

Deno.test({
  name: "herorepo. init() fills repo with test data",
  fn: () => {
    fakeDB.forEach((elem) => heroRepository.add(elem));

    assertNotEquals(
      heroRepository.len(),
      0,
      "len() must return a value greater than 0 after init",
    );
  },
});

Deno.test({
  name: "herorepo. find(Godzilla) return an element after init()",
  fn: () => {
    const elem = heroRepository.find("Godzilla");
    assertExists(elem, "find() must return some value after init()");
  },
});

Deno.test({
  name: "herorepo. findAll() return len > 1 after init()",
  fn: () => {
    assert(
      heroRepository.findAll().length > 1,
      "repository doesn't seem to be initialized",
    );
  },
});

Deno.test({
  name: "herorepo. add() a new element increment repo length",
  fn: () => {
    heroRepository.add({
      name: "Batman",
      powers: "Gadgets",
    });
    assertNotEquals(
      heroRepository.len(),
      0,
      "len() must return a value greater than 0 after init",
    );
  },
});

Deno.test({
  name: "herorepo. remove() decrement repo length",
  fn: () => {
    const initLen: number = heroRepository.len();
    heroRepository.remove("Godzilla");
    const finalLen: number = heroRepository.len();
    assert(finalLen < initLen, "remove() doesn't seem to subtract repo len");
  },
});

Deno.test({
  name: "herorepo. clear() set len() = 0",
  fn: () => {
    heroRepository.clear();
    assertEquals(heroRepository.len(), 0, "clear() must set len() to 0");
  },
});
