import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = environment.API_URL;

  constructor(private http: HttpClient) {}

  login(dto: any) {
    return this.http.post(`${this.api}/auth/login`, dto);
  }

  register(dto: any) {
    return this.http.post(`${this.api}/auth/register`, dto);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}
