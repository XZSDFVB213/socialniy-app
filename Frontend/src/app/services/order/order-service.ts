import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private api = environment.API_URL;

  constructor(private http: HttpClient) {}

  getMyOrders() {
    return this.http.get(`${this.api}/orders/me`);
  }
  getCountOrders() {
    return this.http.get(`${this.api}/orders/count`);
  }
}