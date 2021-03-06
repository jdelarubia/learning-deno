/**
 * worker.ts
 * Simple Worker code example.
 */

console.log();
console.log('hello worker!');

self.addEventListener('message', async (ev: Event) => {
  const { filename } = (ev as any).data;
  console.log('file:', filename);
  const text = await Deno.readTextFile(filename);
  console.log('content of the file:');
  console.log(text);
  self.close();
});
