import { Product } from '../types.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { products } from './mocks.ts';

class ProductsRepo {
  data: Product[];

  constructor(productData: Product[]) {
    this.data = productData;
  }

  findAll(): Product[] {
    return this.data;
  }

  find(id: string): Product | undefined {
    const one: Product | undefined = this.data.find(
      (product) => product.id === id
    );
    return one;
  }

  add(product: Product): string {
    const newProduct: Product = { ...product };
    newProduct.id = v4.generate();
    this.data.push(newProduct);
    return newProduct.id;
  }

  update(updatedProduct: Product) {
    this.data = <any>(
      this.data.map((p) =>
        p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
      )
    );
  }

  remove(id: string) {
    this.data = this.data.filter((p) => p.id !== id);
  }

  len(): number {
    return this.data.length;
  }
} //.ProductsDB

export const productsRepo = new ProductsRepo(products);
