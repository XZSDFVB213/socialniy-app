import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Order } from '../../interface/order.interface';
import { OrderService } from '../../services/order/order-service';
import { User } from '../../interface/user.interface';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
})
export class OrderListPage implements OnInit {
  private orderService = inject(OrderService);

  orders: any[] = [];

  ngOnInit() {
    this.orderService.getMyOrders().subscribe({
      next: (res: any) => {
        this.orders = res;
      },
      
    });
  }
}
