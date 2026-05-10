// forgot-password-modal.component.ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth-service';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonText,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordModalComponent {
  email: string = '';
  code: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  loading = false;
  error: string = '';
  stepTwo = false;
  timer = 60;

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
  ) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async sendCode() {
    if (!this.email) return;

    this.loading = true;
    this.error = '';

    this.authService.requestPasswordReset(this.email).subscribe({
      next: () => {
        this.stepTwo = true;
        this.startTimer();
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Не удалось отправить код на email';
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  startTimer() {
    this.timer = 60;
    const interval = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) clearInterval(interval);
    }, 1000);
  }

  async resendCode() {
    await this.sendCode();
  }

  async resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Пароли не совпадают';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.resetPassword(this.email, this.code, this.newPassword).subscribe({
      next: () => {
        alert('Пароль успешно изменён!');
        this.modalCtrl.dismiss({ success: true });
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Неверный код';
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
