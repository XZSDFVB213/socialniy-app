import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private http = inject(HttpClient);
  addToFavorite(productId: string) {
    return this.http.post(`${environment.API_URL}/favorites/${productId}`,{});
  }
  getFavorites() {
    return this.http.get(`${environment.API_URL}/favorites`);
  }
  removeFromFavorites(id: string) {
    return this.http.delete(`${environment.API_URL}/favorites/${id}`);
  }
}
