/**
 * app.ts
 * Implementation of unix's cat utility.
 */

import { copy } from 'https://deno.land/std@0.119.0/streams/conversion.ts';

async function run() {
  for (const filename of Deno.args) {
    try {
      const file = await Deno.open(filename);
      await copy(file, Deno.stdout);
      file.close();
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        console.log(`${error.name}: ${error.message}`);
      }
      Deno.exit();
    }
  }
} //.

export { run as demoUnixCat };
