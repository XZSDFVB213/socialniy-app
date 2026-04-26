import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, RouterLink],
})
export class RegisterPage implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  ngOnInit() {}

  email = '';
  password = '';
  name = '';
  onRegister() {
    this.authService
      .register({ name: this.name, email: this.email, password: this.password })
      .subscribe(() => {
        this.authService.login({
          email: this.email,
          password: this.password,
        });

        this.router.navigate(['/profile']);
      });
  }
}
