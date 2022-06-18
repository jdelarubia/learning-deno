import { Router, Context } from 'https://deno.land/x/oak@v10.6.0/mod.ts';
import { findAll } from './controllers/products.ts';

const router = new Router();
router.get('/api/v1/products', findAll);

export default router;
