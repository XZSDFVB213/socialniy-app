import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, RouterLink, FormsModule],
})
export class RegisterPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  // ===== signals =====
  name = signal('');
  phone = signal('');
  password = signal('');

  agree = signal(false);
  acceptedPolicy = signal(false);

  // ===== computed =====
  canSubmit = computed(() =>
    this.agree() && this.acceptedPolicy() && this.phone().length > 5
  );

  onRegister() {
    const normalizedPhone = this.authService.normalizePhone(this.phone());

    this.authService
      .register({
        name: this.name(),
        phone: normalizedPhone,
        password: this.password(),
        agree: this.agree(),
        acceptedPolicy: this.acceptedPolicy(),
      })
      .subscribe({
        next: () => {
          this.authService.login({
            phone: normalizedPhone,
            password: this.password(),
          });

          this.router.navigate(['/login']);
        },
        error: (err) => console.error(err),
      });
  }
}