import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ProductService } from '../../services/product-service';
import { BannerSliderPage } from '../banner-slider/banner-slider.page';
import { NotificationsModalComponent } from '../../components/notifications-modal/notifications-modal.component';
import { NotificationService } from '../../services/notifications/notification-service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, IonicModule, RouterLink, AsyncPipe, BannerSliderPage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private productService = inject(ProductService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  products$!: Observable<any[]>;

  // ==================== КАТЕГОРИИ ====================
  categories = [
    { id: 'Все', name: 'Все', icon: '🌐' },
    { id: 'Одежда', name: 'Одежда', icon: '👚' },
    { id: 'Аксессуары', name: 'Аксессуары', icon: '🧦' },
    { id: 'Домашний текстиль', name: 'Домашний текстиль', icon: '🧺' },
    // { id: 'kerchiefs',  name: 'Платки',      icon: '🧕' },
  ];

  ngOnInit() {
    this.products$ = this.productService.getAll().pipe(
      map((products) => products.slice(0, 6)), // Максимум 10 товаров
    );
  }

  // Переход в каталог с выбранной категорией
  goToCatalog(categoryId: string = 'Все') {
    this.router.navigate(['/catalog'], {
      queryParams: { category: categoryId },
    });
  }

  goToProduct(id: string) {
    this.router.navigate(['/product', id]);
  }
  private modalCtrl = inject(ModalController);

  unreadCount$ = this.notificationService.unreadCount$;
  async openNotifications() {
    const modal = await this.modalCtrl.create({
      component: NotificationsModalComponent,
      cssClass: 'notification-modal-top',
      initialBreakpoint: 0.95,
      breakpoints: [0.95],
      backdropDismiss: true,
      handle: false,
    });

    await modal.present();
  }
}