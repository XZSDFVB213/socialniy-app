import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product-service';
import { Product } from '../../interface/product.interface';

type CategoryKey = 'Все' | 'Одежда' | 'Домашний текстиль' | 'Аксессуары' | 'Обувь';

interface Category {
  id: CategoryKey;
  name: string;
  children: string[];
}

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [IonContent, CommonModule],
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {
  private router = inject(Router);
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  products = toSignal(this.productService.getAll(), { initialValue: [] as Product[] });
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const category = params['category'];
      if (category) {
        this.activeCategory.set(category);
      }
    });
  }
  // UI State
  searchTerm = signal('');
  activeCategory = signal<CategoryKey>('Все');
  activeSubCategory = signal<string | null>(null);
  expandedCategory = signal<CategoryKey | null>(null);

  // ==================== ФИЛЬТРАЦИЯ ====================
  filteredProducts = computed(() => {
    const allProducts = this.products();
    const search = this.searchTerm().toLowerCase().trim();
    const category = this.activeCategory();
    const subCategory = this.activeSubCategory();

    return allProducts.filter((p: Product) => {
      const matchSearch =
        !search ||
        p.title?.toLowerCase().includes(search) ||
        p.category?.toLowerCase().includes(search) ||
        p.subcategory?.toLowerCase().includes(search);

      const matchCategory = category === 'Все' || p.category === category;

      const matchSubCategory = !subCategory || p.subcategory === subCategory;

      return matchSearch && matchCategory && matchSubCategory;
    });
  });

  // ==================== МЕТОДЫ ====================
  onSearch(event: any) {
    this.searchTerm.set(event.target.value);
  }

  toggleCategory(id: CategoryKey) {
    if (this.expandedCategory() === id) {
      this.expandedCategory.set(null);
    } else {
      this.expandedCategory.set(id);
    }

    this.activeCategory.set(id);
    this.activeSubCategory.set(null); // сбрасываем подкатегорию
  }

  selectSubCategory(name: string) {
    this.activeSubCategory.set(name);
  }

  goToProduct(id: string) {
    this.router.navigate(['/product', id]);
  }

  // ==================== КАТЕГОРИИ ====================
  categories: Category[] = [
    {
      id: 'Все',
      name: 'Все',
      children: [],
    },

    {
      id: 'Одежда',
      name: 'Одежда',
      children: [
        'Бриджи',
        'Лосины',
        'Брюки',
        'Шорты',
        'Костюмы',
        'Кофты',
        'Толстовки',
        'Футболки',
        'Платья/Сарафаны',
        'Пижамы',
        'Туники',
        'Носки',
        'Колготки',
        'Кепки',
        'Майки',
        'Трусы',
      ],
    },

    {
      id: 'Домашний текстиль',
      name: 'Текстиль',
      children: [
        'Полотенца',
        'Пледы',
        'Одеяла',
        'Подушки',
        'Покрывала',
        'Скатерти',
        'Прихватки',
        'Фартуки',
      ],
    },

    {
      id: 'Аксессуары',
      name: 'Аксессуары',
      children: ['Сумки', 'Зонты'],
    },

    {
      id: 'Обувь',
      name: 'Обувь',
      children: ['Тапочки'],
    },
  ];
}
