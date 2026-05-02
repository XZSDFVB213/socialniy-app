import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { map, Observable } from 'rxjs';
import { ProductService } from '../../services/product-service';
import { IonContent } from '@ionic/angular/standalone';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../interface/product.interface';

type CategoryKey = 'all' | 'textile' | 'kitchen' | 'clothes' | 'accessories';

interface Category {
  id: CategoryKey;
  name: string;
  children: { id: string; name: string }[];
}
@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [IonContent, AsyncPipe, CommonModule],
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage {
  private router = inject(Router);
  private productService = inject(ProductService);
  products = toSignal(this.productService.getAll(), { initialValue: [] });

  // 🔥 UI state
  searchTerm = signal('');
  activeCategory = signal<CategoryKey>('all');
  activeSubCategory = signal<string | null>(null);

  expandedCategory: string | null = null;

  filteredProducts = computed(() => {
    const products = this.products();
    const search = this.searchTerm().toLowerCase();
    const category = this.activeCategory();
    const subCategory = this.activeSubCategory();

    return products.filter((p: any) => {
      const matchSearch = p.title?.toLowerCase().includes(search);

      const matchCategory = category === 'all' || p.category === category;

      const matchSubCategory = !subCategory || p.subCategory === subCategory;

      return matchSearch && matchCategory && matchSubCategory;
    });
  });
  onSearch(event: any) {
    this.searchTerm.set(event.target.value);
  }

  toggleCategory(id: CategoryKey) {
    this.expandedCategory = this.expandedCategory === id ? null : id;

    this.activeCategory.set(id);
    this.activeSubCategory.set(null);
  }

  selectSubCategory(id: string) {
    this.activeSubCategory.set(id);
  }

  goToProduct(id: string) {
    this.router.navigate(['/product', id]);
  }
  categories: Category[] = [
    {
      id: 'all',
      name: 'Все',
      children: [
        { id: 'all', name: 'Все' },
        { id: 'textile', name: 'Текстиль' },
        { id: 'kitchen', name: 'Кухня' },
        { id: 'clothes', name: 'Одежда' },
        { id: 'accessories', name: 'Аксессуары' },
      ],
    },
    {
      id: 'textile',
      name: 'Текстиль',
      children: [
        { id: 'towels', name: 'Полотенца' },
        { id: 'napkins', name: 'Салфетки' },
      ],
    },
    { id: 'kitchen', name: 'Кухня', children: [{ id: 'apron', name: 'Фартуки' }] },
    { id: 'clothes', name: 'Одежда', children: [{ id: 'socks', name: 'Носки' }] },
  ];
}
