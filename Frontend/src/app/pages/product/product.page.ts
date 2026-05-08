import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ToastController } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { Product } from '../../interface/product.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { FavoriteService } from '../../services/favorite/favorite-service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule],
})
export class ProductPage implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private favoriteService = inject(FavoriteService);
  private toastCtrl = inject(ToastController); // ← Добавили

  product = toSignal(this.productService.getById(this.route.snapshot.paramMap.get('id')!), {
    initialValue: {} as Product,
  });

  // ==================== Toast ====================
  private async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'top', // можно 'bottom'
      cssClass: 'custom-toast',
    });
    await toast.present();
  }

  addToFavorite() {
    const id = this.product()?.id;
    if (!id) {
      this.showToast('Товар не найден', 'danger');
      return;
    }

    this.favoriteService.addToFavorite(id).subscribe({
      next: async (response: any) => {
        if (response.alreadyExists) {
          await this.showToast('❤️ Товар уже в избранном', 'warning'); // или 'success'
        } else {
          await this.showToast('❤️ Товар добавлен в избранное!', 'success');
        }
      },
      error: async (err) => {
        console.error(err);
        await this.showToast('Не удалось добавить в избранное', 'danger');
      },
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.warn('Product ID not found in route');
    }
  }
}
