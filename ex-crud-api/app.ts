import { Application } from 'https://deno.land/x/oak@v10.6.0/mod.ts';
import productsRouter from './routes.ts';

const HOST = '127.0.0.1';
const PORT = Deno.env.get('PORT') || 8080;

const run = async () => {
  const app = new Application();
  app.use(productsRouter.routes());
  app.use(productsRouter.allowedMethods());
  console.log(`API server running on ${HOST}:${PORT}`);
  await app.listen({ hostname: HOST, port: +PORT });
};

export { run as demoCrudApi };
