import { Product, OptionalProduct } from '../types.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { products } from './mocks.ts';

class ProductsDB {
  data: OptionalProduct[];

  constructor(productData: OptionalProduct[]) {
    this.data = productData;
  }

  all(): OptionalProduct[] {
    return this.data;
  }

  one(id: string): OptionalProduct | undefined {
    const one: OptionalProduct | undefined = this.data.find(
      (product) => product.id === id
    );
    return one;
  }

  add(product: OptionalProduct): string {
    const newProduct: OptionalProduct = product;
    newProduct.id = v4.generate();
    this.data.push(newProduct);
    return newProduct.id;
  }

  update(updatedProduct: OptionalProduct) {
    this.data.map((p) => {
      p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p;
      console.log('updated product', p);
    });
  }

  len(): number {
    return this.data.length;
  }
} //.ProductsDB

export const fakeDB = new ProductsDB(products);