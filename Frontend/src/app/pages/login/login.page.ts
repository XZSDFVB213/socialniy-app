import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
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
  ngOnInit() {}

  phone = '';
  password = '';

  login() {
    this.authService
      .login({
        phone: this.phone,
        password: this.password,
      })
      .subscribe((res: any) => {
        this.authService.saveToken(res.token);
        this.authService.saveUser(res.user);

        this.router.navigate(['/profile']);
      });
  }
}
