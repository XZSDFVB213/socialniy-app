import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = environment.API_URL;

  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient) {
    this.loadUser(); // загружаем пользователя при старте
  }

  login(dto: any) {
    return this.http.post<any>(`${this.api}/auth/login`, dto).pipe(
      tap((response) => {
        if (response.token) {
          this.saveToken(response.token);
        }
        if (response.user) {
          this.saveUser(response.user);
        } else if (response.data?.user) {
          // на случай разной структуры
          this.saveUser(response.data.user);
        }
      }),
    );
  }

  register(dto: any) {
    return this.http.post<any>(`${this.api}/auth/register`, dto).pipe(
      tap((response) => {
        if (response.token) {
          this.saveToken(response.token);
        }
        if (response.user) {
          this.saveUser(response.user);
        }
      }),
    );
  }
  // auth.service.ts
  requestPasswordReset(email: string) {
    return this.http.post(`${this.api}/auth/request-reset`, { email });
  }

  resetPassword(email: string, code: string, newPassword: string) {
    return this.http.post(`${this.api}/auth/reset-password`, {
      email,
      code,
      newPassword,
    });
  }
  normalizePhone(phone: string): string {
    let cleaned = phone.replace(/\D/g, '');

    if (cleaned.startsWith('8')) cleaned = '7' + cleaned.slice(1);
    if (!cleaned.startsWith('7')) cleaned = '7' + cleaned;

    return '+' + cleaned;
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.user.next(user);
  }

  loadUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.user.next(JSON.parse(userStr));
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
