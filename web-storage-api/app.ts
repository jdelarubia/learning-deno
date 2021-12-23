/**
 * app.ts
 * Test basic functionality of localStorage.
 */

import { heroRepository as repo } from "./heroRepository.ts";
import { fakeDB } from "./mocks.ts";

function initDB() {
  console.log("Initializing our repository");
  fakeDB.forEach((hero) => repo.add(hero));
} //.

function printAllHeroes() {
  console.log("All our heroes/villains");
  const all = repo.findAll();
  for (const hero in all) {
    console.log(all[hero]);
  }
  console.log(`Our repository currently has ${repo.len()} elements.`);
} //.

function clearDB() {
  console.log("Clearing our our repository");
  repo.clear();
} //.

function removeCouchPotato() {
  console.log("We detected an outlier. Removing Mr.'Couch Potato' from our DB");
  repo.remove("couch potato");
} //.

function removeHero(key: string) {
  console.log(`removing ${key}`);
  repo.remove(key);
} //.

function run() {
  console.log();
  console.log("localStorage Demo");
  initDB();
  printAllHeroes();
  removeCouchPotato();
  removeHero("Godzilla");
  printAllHeroes();
  clearDB();
  console.log();
} //.

export { run as demoStorage };
