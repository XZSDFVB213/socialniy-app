import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule],
})
export class CatalogPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  activeCategory: string = 'all';
  activeSubCategory: string | null = null;
  expandedCategory: string | null = null;
  categories = [
    {
      id: 'all',
      name: 'Все',
      children: [],
    },
    {
      id: 'home',
      name: 'Дом',
      children: [
        { id: 'textile', name: 'Текстиль' },
        { id: 'kitchen', name: 'Кухня' },
        { id: 'care', name: 'Уход' },
      ],
    },
    {
      id: 'kids',
      name: 'Детям',
      children: [
        { id: 'socks', name: 'Носки' },
        { id: 'clothes_kids', name: 'Одежда' },
      ],
    },
    {
      id: 'clothes',
      name: 'Одежда',
      children: [
        { id: 'nike', name: 'Nike' },
        { id: 'jacket', name: 'Куртки' },
      ],
    },
  ];

  products = [
    {
      name: 'Набор полотенец для семьи',
      price: '1 299 ₽',
      oldPrice: '1 899 ₽',
      badge: 'Соц. цена',
      image:
        'https://images.unsplash.com/photo-1616628182509-6f6db3686a0a?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Детские хлопковые носки',
      price: '450 ₽',
      oldPrice: '700 ₽',
      badge: '-35%',
      image:
        'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Базовый набор для кухни',
      price: '1 640 ₽',
      oldPrice: '2 200 ₽',
      badge: 'Выгодно',
      image:
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Набор товаров для ухода',
      price: '890 ₽',
      oldPrice: '1 350 ₽',
      badge: '-30%',
      image:
        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Nike Air Max 270',
      price: '8 990 ₽',
      oldPrice: '12 990 ₽',
      badge: 'Хит',
      image:
        'https://images.unsplash.com/photo-1606813907291-76b8c0c0d6a3?auto=format&fit=crop&w=600&q=80',
    },
  ];
  toggleCategory(id: string) {
    this.expandedCategory = this.expandedCategory === id ? null : id;
  }
  selectSubCategory(id: string) {
    this.activeSubCategory = id;
  }
  get filteredProducts() {
    if (this.activeCategory === 'all' && !this.activeSubCategory) {
      return this.products;
    }

    return this.products.filter((p) => {
      const text = p.name.toLowerCase();

      if (this.activeSubCategory === 'textile') {
        return text.includes('полотенец') || text.includes('плед');
      }

      if (this.activeSubCategory === 'kitchen') {
        return text.includes('кухни');
      }

      if (this.activeSubCategory === 'care') {
        return text.includes('уход');
      }

      if (this.activeSubCategory === 'socks') {
        return text.includes('носк');
      }

      if (this.activeSubCategory === 'nike') {
        return text.includes('nike');
      }

      return true;
    });
  }
}
