/**
 * data.ts
 * Sample products data to test our app.
 */

import { Product } from '../types.ts';

export let products: Product[] = [
  {
    id: '1',
    name: 'Product One',
    description: 'First amazing product in our catalogue!',
    price: 29.99,
  },
  {
    id: '2',
    name: 'Product Two',
    description: 'Second Product in our catalogue',
    price: 49.99,
  },
  {
    id: '3',
    name: 'Product Three',
    description: 'Third Product of our catalogue',
    price: 59.99,
  },
];
