import { Component, OnInit } from '@angular/core';

import { map, Observable } from 'rxjs';
import { ProductService } from '../../services/product-service';
import { IonContent } from '@ionic/angular/standalone';
import { AsyncPipe, CommonModule } from '@angular/common';

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
export class CatalogPage implements OnInit {
  products: any[] = [];
  products$!: Observable<any[]>;

  expandedCategory: string | null = null;
  activeCategory: CategoryKey = 'all';
  activeSubCategory: string | null = null;

  // 🔥 категории под UI
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
    {
      id: 'kitchen',
      name: 'Кухня',
      children: [{ id: 'apron', name: 'Фартуки' }],
    },
    {
      id: 'clothes',
      name: 'Одежда',
      children: [{ id: 'socks', name: 'Носки' }],
    },
  ];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAll().subscribe((data) => {
      this.products = data;
      this.updateProducts();
    });
  }
  searchTerm: string = '';

  onSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.updateProducts();
  }
  // 🔁 обновление стрима
  updateProducts() {
    this.products$ = new Observable((observer) => {
      observer.next(this.filteredProducts);
      observer.complete();
    });
  }

  // 🔥 логика фильтрации
  get filteredProducts() {
    return this.products.filter((p: any) => {
      const matchCategory = this.activeCategory === 'all' || p.category === this.activeCategory;

      const matchSubCategory = !this.activeSubCategory || p.subCategory === this.activeSubCategory;

      return matchCategory && matchSubCategory;
    });
  }

  // 👉 открыть категорию
  toggleCategory(id: CategoryKey) {
    this.expandedCategory = this.expandedCategory === id ? null : id;
    this.activeCategory = id;
    this.activeSubCategory = null;

    this.updateProducts();
  }

  // 👉 выбрать подкатегорию
  selectSubCategory(id: string) {
    this.activeSubCategory = id;
    this.updateProducts();
  }
}
