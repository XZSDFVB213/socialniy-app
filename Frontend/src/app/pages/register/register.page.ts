import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonSelect,
  IonSelectOption,
  ToastController, // ← Добавь это
} from '@ionic/angular/standalone';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { FormsModule } from '@angular/forms';
import { City } from '../../interface/user.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, RouterLink, FormsModule, IonSelect, IonSelectOption],
})
export class RegisterPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastCtrl = inject(ToastController); // ← Инжектим

  // signals...
  name = signal('');
  phone = signal('');
  password = signal('');
  email = signal('');
  agree = signal(false);
  acceptedPolicy = signal(false);
  city = signal<City>('Derbent');

  canSubmit = computed(() => this.agree() && this.acceptedPolicy());

  // ==================== Метод для показа тоста ====================
  private async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
      position: 'middle', // или 'bottom' / 'middle'
      cssClass: 'custom-toast', // можно стилизовать
    });
    await toast.present();
  }

  async onRegister() {
    try {
      const normalizedPhone = this.authService.normalizePhone(this.phone());

      await firstValueFrom(
        this.authService.register({
          name: this.name(),
          phone: normalizedPhone,
          password: this.password(),
          email: this.email(),
          city: this.city(),
          agree: this.agree(),
          acceptedPolicy: this.acceptedPolicy(),
        }),
      );

      await this.showToast('Вы успешно зарегистрированы!', 'success');

      setTimeout(() => {
        this.router.navigate(['/home'], {
          replaceUrl: true,
        });
      }, 50);
    } catch (err: any) {
      console.error(err);

      let message = 'Ошибка регистрации';

      if (err.error?.message) {
        message = err.error.message;
      }

      await this.showToast(message, 'danger');
    }
  }
}
