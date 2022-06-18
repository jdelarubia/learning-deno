/**
 * routes.ts
 * Define all the endpoints of our API.
 */

import { Router } from 'https://deno.land/x/oak@v10.6.0/mod.ts';
import { all, one, remove, update, add } from './controllers/products.ts';

const productsRouter = new Router();

productsRouter
  .get('/api/v1/products', all)
  .get('/api/v1/products/:id', one)
  .post('/api/v1/products', add)
  .put('/api/v1/products/:id', update)
  .delete('/api/v1/products/:id', remove);

export default productsRouter;
