import { Component, inject } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IonContent,CommonModule],
  templateUrl: './profile.page.html',
})
export class ProfilePage {
  auth = inject(AuthService);
  private router = inject(Router);

  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}