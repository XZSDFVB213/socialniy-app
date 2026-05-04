import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = environment.API_URL;

  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient) {}

  login(dto: any) {
    return this.http.post(`${this.api}/auth/login`, dto);
  }

  register(dto: any) {
    return this.http.post(`${this.api}/auth/register`, dto);
  }
  normalizePhone(phone: string): string {
    let cleaned = phone.replace(/\D/g, ''); // убрать всё кроме цифр

    if (cleaned.startsWith('8')) {
      cleaned = '7' + cleaned.slice(1);
    }

    if (!cleaned.startsWith('7')) {
      cleaned = '7' + cleaned;
    }

    return '+' + cleaned;
  }
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.user.next(user);
  }

  loadUser() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user.next(JSON.parse(user));
    }
  }
}
