// src/app/services/notification/notification.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private http = inject(HttpClient);
  private apiUrl = environment.API_URL;
  private unreadCountSubject = new BehaviorSubject<number>(0);
  unreadCount$ = this.unreadCountSubject.asObservable();

  private notificationsSubject = new BehaviorSubject<any[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  constructor() {
    this.loadUnreadCount();
  }

  loadUnreadCount() {
    this.http.get<{ count: number }>(`${this.apiUrl}/notifications/unread/count`).subscribe({
      next: (res) => this.unreadCountSubject.next(res.count),
      error: () => this.unreadCountSubject.next(0),
    });
  }

  getNotifications() {
    return this.http
      .get<any[]>(`${this.apiUrl}/notifications`)
      .pipe(tap((notifs) => this.notificationsSubject.next(notifs)));
  }

  markAllAsRead() {
    return this.http
      .patch(`${this.apiUrl}/notifications/read-all`, {})
      .pipe(tap(() => this.unreadCountSubject.next(0)));
  }
}
