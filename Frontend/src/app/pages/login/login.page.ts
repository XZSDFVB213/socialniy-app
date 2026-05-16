import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  ModalController,
  ToastController, // ← Добавили
} from '@ionic/angular/standalone';

import { AuthService } from '../../services/auth/auth-service';
import { Router, RouterLink } from '@angular/router';
import { ForgotPasswordModalComponent } from '../../components/forgot-password-modal/forgot-password-modal.component';

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
  constructor(private modalCtrl: ModalController) {}

  phone = '';
  password = '';

  ngOnInit() {}

  // ==================== Всплывающее уведомление ====================
  private async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color,
      position: 'middle',
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
  async forgotPassword() {
    const modal = await this.modalCtrl.create({
      component: ForgotPasswordModalComponent,
      cssClass: 'forgot-password-modal', // можно стилизовать
      backdropDismiss: true,
    });

    await modal.present();
  }
}
