/**
 * app.ts
 * Test basic functionality of localStorage.
 */

import { heroRepository as repo } from "./heroRepository.ts";

function initDB() {
  console.log("Initializing our repository");
  repo.add({ name: "Godzilla", powers: "Super Strength, Endurance" });
  repo.add({
    name: "Death",
    powers: "Accelerated Healing, Astral Projection",
  });
  repo.add({ name: "Elektra", powers: "Acrobatics, Endurance" });
  repo.add({ name: "Captain Marvel", powers: "" });
  repo.add({ name: "Aegis", powers: "Accelerated Healing, Clairvoyance" });
  repo.add({ name: "Batman", powers: "Acrobatics, Enhanced Memory" });
  repo.add({ name: "couch potato", powers: "watch tv, order fastfood" });
} //.

function printLength() {
  console.log(`Our repository currently has ${repo.length()} elements.`);
} //.

function printAll() {
  console.log("All our heroes/villains");
  const all = repo.getAll();
  for (const hero in all) {
    console.log(all[hero]);
  }
} //.

function clearDB() {
  console.log("Clearing our our repository");
  repo.clear();
} //.

function removeCouchPotato() {
  console.log(
    "We detected an outlier. Removing Mr.'Couch Potato' from our repo"
  );
  repo.remove("couch potato");
} //.

function run() {
  console.log();
  console.log("localStorage Demo");
  initDB();
  printLength();
  printAll();
  removeCouchPotato();
  printLength();
  clearDB();
  console.log();
} //.

export { run as demoStorage };
