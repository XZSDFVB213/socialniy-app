import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, IonicModule,RouterLink],
  templateUrl: './home.page.html',
})
export class HomePage {
  private router = inject(Router);

  goToCatalog() {
    this.router.navigate(['/catalog']);
  }
  categories = [
    { name: 'Нижнее бельё', icon: '👚' },
    { name: 'Носки', icon: '🧦' },
    { name: 'Полотенца', icon: '🧺' },
    { name: 'Платки', icon: '🧕' },
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
  ];
}
