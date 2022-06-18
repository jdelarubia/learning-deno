import { Application } from 'https://deno.land/x/oak@v10.6.0/mod.ts';
import router from './routes.ts';

const HOST = 'localhost';
const PORT = 8080;

const run = async () => {
  const app = new Application();
  app.use(router.routes());
  app.use(router.allowedMethods());
  console.log(`Server running on ${HOST}:${PORT}`);
  await app.listen({ hostname: HOST, port: PORT });
};

export { run as demoCrudApi };
// run();
