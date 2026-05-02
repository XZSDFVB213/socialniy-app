import { Component, inject, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { CommonModule } from '@angular/common';
import { User } from '../../interface/user.interface';
import { OrderListPage } from '../order-list/order-list.page';
import { OrderService } from '../../services/order/order-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IonContent, CommonModule, RouterLink, OrderListPage],
  templateUrl: './profile.page.html',
})
export class ProfilePage implements OnInit {
  auth = inject(AuthService);
  private ordersService = inject(OrderService);
  private router = inject(Router);
  user$ = this.auth.user$;
  ordersCount = toSignal(this.ordersService.getCountOrders(), { initialValue: 0 });
  ngOnInit(): void {
  this.auth.user$.subscribe(user => {
    if (!user) return;
  });
}
  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
  logout() {
    this.auth.logout();
  }
}
