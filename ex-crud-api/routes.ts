import { Router, Context } from 'https://deno.land/x/oak@v10.6.0/mod.ts';

const router = new Router();
router.get('/api/v1/products', (context: Context) => {
  context.response.body = 'Hello World';
});

export default router;
