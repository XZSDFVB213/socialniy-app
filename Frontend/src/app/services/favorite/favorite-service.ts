import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Favorite } from '../../interface/favorite.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  // Главный источник правды
  private baseUrl = environment.API_URL;
  private favoritesSignal = signal<Favorite[]>([]);
  private favoriteCountSignal = signal<number>(0);
  public favoriteCount = this.favoriteCountSignal.asReadonly();
  public favorites = this.favoritesSignal.asReadonly();

  constructor(private http: HttpClient) {}

  getFavorites(): Observable<Favorite[]> {
    return this.http
      .get<Favorite[]>(`${this.baseUrl}/favorites`)
      .pipe(tap((res) => this.favoritesSignal.set(res as Favorite[])));
  }

  addToFavorite(productId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/favorites/${productId}`, { productId }).pipe(
      tap(() => {
        this.refreshFavorites();
        this.refreshCount();
      }), // ← важно!
    );
  }

  removeFromFavorites(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/favorites/${id}`).pipe(
      tap(() => {
        this.refreshFavorites();
        this.refreshCount();
      }),
    );
  }
  refreshCount() {
    this.getFavoriteCount().subscribe();
  }
  getFavoriteCount(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/favorites/count`)
      .pipe(tap((res) => this.favoriteCountSignal.set(res)));
  }

  // Принудительно обновляем список
  private refreshFavorites() {
    this.getFavorites().subscribe();
  }

  // Можно добавить, если нужно сразу добавить без запроса
  addLocally(newFavorite: Favorite) {
    this.favoritesSignal.update((list) => [...list, newFavorite]);
  }
}
