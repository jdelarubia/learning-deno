# Workers

Deno supports Web Workers API.

This example requires --allow-read and --unstable flag to be passed on.

Our worker reads a file and print its content on screen.

## NOTES

- `worker.ts`. If we want the Worker to listen to events, we need to use the
  `self.addEventListener(message...)` instead of `self.message`
- messages are passed via the Event's `data` property

## Resources

- [Deno's official documentation](https://deno.land/manual@v1.16.3/runtime/workers)
- [James L Milner article Easier Web Workers](https://www.jameslmilner.com/post/easier-web-workers/)
- [JamesLMilner/web-worker-comparison web worker example](https://github.com/JamesLMilner/web-worker-comparison)
