import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { NotificationService } from '../../services/notifications/notification-service';

@Component({
  selector: 'app-notifications-modal',
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
  templateUrl: './notifications-modal.component.html',
  styleUrls: ['./notifications-modal.component.scss'],
})
export class NotificationsModalComponent implements OnInit {
  private modalCtrl = inject(ModalController);
  private notificationService = inject(NotificationService);

  notifications: any[] = [];

  ngOnInit() {
    this.notificationService.getNotifications().subscribe({
      next: (data) => (this.notifications = data),
      error: (err) => console.error(err),
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead().subscribe(() => {
      this.notifications.forEach((n) => (n.read = true));
    });
  }
}
