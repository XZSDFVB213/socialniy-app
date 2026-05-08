import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product-service';
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
  activeCategory = signal<CategoryKey>('all');
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
        p.category?.toLowerCase().includes(search);

      const matchCategory = category === 'all' || p.category === category;
      const matchSubCategory = !subCategory || p.subCategory === subCategory;

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

  selectSubCategory(id: string) {
    this.activeSubCategory.set(id);
  }

  goToProduct(id: string) {
    this.router.navigate(['/product', id]);
  }

  // ==================== КАТЕГОРИИ ====================
  categories: Category[] = [
    { id: 'all', name: 'Все', children: [] },
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
    {
      id: 'accessories',
      name: 'Аксессуары',
      children: [],
    },
  ];
}
