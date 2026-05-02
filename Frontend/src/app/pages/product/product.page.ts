import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
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
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
})
export class ProductPage implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private favoriteService = inject(FavoriteService);
  product = toSignal(this.productService.getById(this.route.snapshot.paramMap.get('id')!), { initialValue: {} as Product });

  addToFavorite() {
  const id = this.product()?.id;

  if (!id) return;

  this.favoriteService.addToFavorite(id).subscribe(() => {
    console.log('added to favorites');
  });
}
ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');

  if (!id) return;
}
}
