import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent,CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  private authService = inject(AuthService)
  private router = inject(Router)
  ngOnInit() {
  }

  email = ''
  password = ''

  login(){
    this.authService.login({
      email:this.email,
      password:this.password
    }).subscribe((res:any)=>{
      this.authService.saveToken(res.access_token)
      this.router.navigate(['/profile'])
    })
  }
}
