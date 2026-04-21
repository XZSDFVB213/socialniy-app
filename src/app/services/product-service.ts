import { Injectable } from '@angular/core';
import { products } from '../data/product.data.mock';
import { normalizeProducts } from '../utils/product-normalizer';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private products = normalizeProducts(products);

  getAll() {
    return of(this.products);
  }
}