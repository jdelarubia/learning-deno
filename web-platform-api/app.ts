/**
 * app.ts
 * Test Deno's web platform api.
 */

// auxiliary specific types
type Album = { name: string; band: string; sold: string };
type Albums = { [index: string]: Album[] };

/**
 * Get the data into JSON, then iterates over it and extract the information we want.
 */
async function run() {
  console.log('**************************************************');
  console.log('Web Platform API Demo');
  const url: URL = new URL('./albums.json', import.meta.url);
  const response: Response = await fetch(url);
  const data: Albums = await response.json();
  const albums: Album[] = data.albums;

  for (const album of albums) {
    const { name, band, sold } = album;

    console.log(`${band} (${name}) : ${sold}`);
  }
  console.log();
} //.

export { run as demoWebPlatform };
