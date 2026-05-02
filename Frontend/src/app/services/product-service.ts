import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, of } from 'rxjs';
import { Product } from '../interface/product.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api = environment.API_URL;
  private http = inject(HttpClient);
  private products = new BehaviorSubject<Product[]>([]);
  products$ = this.products.asObservable();

  getAll() {
    return this.http.get<Product[]>(`${this.api}/products`);
  }
  getById(id: string) {
    return this.http.get<Product>(`${this.api}/products/${id}`);
  }
  // getTop(limit = 10) {
  //   return of(this.products.slice(0, limit));
  // }
}
