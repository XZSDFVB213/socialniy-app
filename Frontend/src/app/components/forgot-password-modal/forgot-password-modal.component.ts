import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { finalize, interval, take, tap } from 'rxjs';

import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-forgot-password-modal',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './forgot-password-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordModalComponent {
  private cdr = inject(ChangeDetectorRef);

  email = '';
  code = '';
  newPassword = '';
  confirmPassword = '';

  loading = false;
  error = '';
  stepTwo = false;
  timer = 0;

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private toastController: ToastController,
  ) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  sendCode() {
    if (!this.email.trim()) {
      this.error = 'Введите email';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService
      .requestPasswordReset(this.email.trim().toLowerCase())
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: async () => {
          this.stepTwo = true;
          this.startTimer();

          const toast = await this.toastController.create({
            message: 'Код отправлен на email',
            duration: 2000,
            position: 'top',
          });

          await toast.present();
        },

        error: (err) => {
          this.error = err?.error?.message || 'Не удалось отправить код';
        },
      });
  }

  resendCode() {
    if (this.timer > 0 || this.loading) return;

    this.sendCode();
  }

  resetPassword() {
    if (!this.code.trim()) {
      this.error = 'Введите код';
      return;
    }

    if (this.newPassword.length < 6) {
      this.error = 'Пароль минимум 6 символов';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Пароли не совпадают';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService
      .resetPassword(this.email.trim().toLowerCase(), this.code.trim(), this.newPassword)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: async () => {
          const toast = await this.toastController.create({
            message: 'Пароль успешно изменён',
            duration: 2000,
            position: 'top',
            color: 'success',
          });

          await toast.present();

          this.modalCtrl.dismiss({
            success: true,
          });
        },

        error: (err) => {
          this.error = err?.error?.message || 'Неверный код';
        },
      });
  }

  private startTimer() {
    this.timer = 60;

    interval(1000)
      .pipe(
        take(60),
        tap(() => {
          this.timer--;
          this.cdr.markForCheck();
        }),
      )
      .subscribe();
  }
}
