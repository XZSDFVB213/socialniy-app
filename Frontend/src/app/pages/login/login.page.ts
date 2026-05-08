import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  ToastController, // ← Добавили
} from '@ionic/angular/standalone';

import { AuthService } from '../../services/auth/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, RouterLink],
})
export class LoginPage implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);

  phone = '';
  password = '';

  ngOnInit() {}

  // ==================== Всплывающее уведомление ====================
  private async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color,
      position: 'top',
      cssClass: 'custom-toast',
    });
    await toast.present();
  }

  login() {
    this.authService
      .login({
        phone: this.authService.normalizePhone(this.phone),
        password: this.password,
      })
      .subscribe({
        next: async () => {
          await this.showToast('Вы успешно вошли!', 'success');
          this.router.navigate(['/home'], { replaceUrl: true });
        },
        error: async (err) => {
          console.error(err);
          this.showToast('Неверный логин или пароль', 'danger');
        },
      });
  }
}
