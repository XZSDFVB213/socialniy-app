import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { ProductService } from '../../services/product-service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, IonicModule, RouterLink, AsyncPipe],
  templateUrl: './home.page.html',
})
export class HomePage implements OnInit {
  constructor(private productService: ProductService) {}
  products$!: Observable<any[]>;
  private router = inject(Router);
  ngOnInit() {
    // this.products$ = this.productService.getTop()
  }
  goToCatalog() {
    this.router.navigate(['/catalog']);
  }
  categories = [
    { name: 'Нижнее бельё', icon: '👚' },
    { name: 'Носки', icon: '🧦' },
    { name: 'Полотенца', icon: '🧺' },
    { name: 'Платки', icon: '🧕' },
  ];
  goToProduct(id: string) {
    this.router.navigate(['/product', id]);
  }
}
