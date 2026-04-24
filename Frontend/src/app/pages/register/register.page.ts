import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
})
export class RegisterPage implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  ngOnInit() {}

  email = '';
  password = '';
  name = '';
  register() {
    this.authService
      .register({
        email: this.email,
        password: this.password,
        name: this.name,
      })
      .subscribe((res: any) => {
        this.authService.saveToken(res.access_token);
        this.router.navigate(['/login']);
      });
  }
}
