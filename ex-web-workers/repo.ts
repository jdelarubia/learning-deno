/**
 * rep.ts
 * LocalStorage-based repository class.
 */

import { _Product, _RepoIndex, _Specs } from "./shared.ts";

class ProductRepo {
  private currentId = 0;

  len(): number {
    return localStorage.length;
  } //.

  add(product: _Product) {
    const { specs } = product;
    this.currentId++;
    localStorage.setItem(this.currentId.toString(), JSON.stringify(specs));
  } //.

  find(key: _RepoIndex): _Specs {
    return JSON.parse(localStorage.getItem(key.toString())!);
  } //.

  findAll(): _Product[] {
    const all: _Product[] = [];
    for (let i = 0; i < this.len(); i++) {
      const productId: string = localStorage.key(i)!;
      all.push({
        id: +productId,
        specs: this.find(productId),
      });
    }
    return all;
  } //.

  findBy(filter: string, value: string): _Product[] {
    const found: _Product[] = [];
    for (let i = 0; i < this.len(); i++) {
      const productId: string = localStorage.key(i)!;
      const specs = this.find(productId);
      if (specs[filter] === value) {
        found.push({
          id: +productId,
          specs: this.find(productId),
        });
      }
    }
    return found;
  } //.

  remove(key: _RepoIndex): _Specs | null {
    const previous = this.find(key);
    localStorage.removeItem(key.toString());
    return previous;
  } //.

  clear() {
    localStorage.clear();
  } //.
} //. ProductRepo

const productRepo = new ProductRepo();

export { ProductRepo, productRepo };
