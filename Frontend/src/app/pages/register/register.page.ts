import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonContent, 
  IonSelect, 
  IonSelectOption, 
  ToastController   // ← Добавь это
} from '@ionic/angular/standalone';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { FormsModule } from '@angular/forms';
import { City } from '../../interface/user.interface';

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
  private toastCtrl = inject(ToastController);   // ← Инжектим

  // signals...
  name = signal('');
  phone = signal('');
  password = signal('');
  agree = signal(false);
  acceptedPolicy = signal(false);
  city = signal<City>(City.Derbent);

  canSubmit = computed(() =>
    this.agree() && this.acceptedPolicy()
  );

  // ==================== Метод для показа тоста ====================
  private async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
      position: 'top',        // или 'bottom' / 'middle'
      cssClass: 'custom-toast', // можно стилизовать
    });
    await toast.present();
  }

  async onRegister() {
  const normalizedPhone = this.authService.normalizePhone(this.phone());

  this.authService
    .register({
      name: this.name(),
      phone: normalizedPhone,
      password: this.password(),
      city: this.city(),
      agree: this.agree(),
      acceptedPolicy: this.acceptedPolicy(),
    })
    .subscribe({
      next: async (response) => {
        await this.showToast('Вы успешно зарегистрированы!', 'success');

        // После регистрации сразу логиним (если бэкенд не отдал токен при регистрации)
        this.authService.login({
          phone: normalizedPhone,
          password: this.password(),
        }).subscribe({
          next: () => {
            this.router.navigate(['/home'], { replaceUrl: true });
          },
          error: (err) => {
            console.error(err);
            this.showToast('Регистрация прошла, но не удалось войти автоматически', 'warning');
            this.router.navigate(['/login']);
          }
        });
      },

      error: async (err) => {
        console.error(err);
        let message = 'Ошибка регистрации';

        if (err.error?.message) message = err.error.message;
        else if (err.status === 400 && err.error?.phone) message = 'Пользователь с таким телефоном уже существует';

        await this.showToast(message, 'danger');
      }
    });
}
}