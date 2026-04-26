import { Injectable } from '@angular/core';
import { products } from '../data/product.data.mock';
import { normalizeProducts } from '../utils/product-normalizer';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products = normalizeProducts(products);

  getAll() {
    return of(this.products);
  }
  getById(id: string) {
    return of(this.products).pipe(
      map((products) => products.find((p) => p.id === id)!));
  }
  getTop(limit = 10) {
  return of(this.products.slice(0, limit));
}
}
