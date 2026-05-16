import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
} from '@ionic/angular/standalone';

import { FavoriteService } from '../../services/favorite/favorite-service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonItem,
  ],
})
export class FavoritePage implements OnInit {
  private favoriteService = inject(FavoriteService);

  favorites = this.favoriteService.favorites;

  // свайп позиции
  swipeOffsets: Record<string, number> = {};

  // стартовая точка тача
  startX: Record<string, number> = {};

  // состояние драга
  isDragging: Record<string, boolean> = {};

  ngOnInit() {
    this.favoriteService.getFavorites().subscribe();
  }

  remove(id: string) {
    this.favoriteService.removeFromFavorites(id).subscribe();

    delete this.swipeOffsets[id];
    delete this.startX[id];
    delete this.isDragging[id];
  }

  onTouchStart(event: TouchEvent, id: string) {
    this.startX[id] = event.touches[0].clientX;
    this.isDragging[id] = true;
  }

  onTouchMove(event: TouchEvent, id: string) {
    const currentX = event.touches[0].clientX;

    const diff = currentX - this.startX[id];

    // только влево
    if (diff < 0) {
      // ограничиваем свайп
      this.swipeOffsets[id] = Math.max(diff, -140);
    }
  }

  onTouchEnd(id: string) {
    this.isDragging[id] = false;

    // удаление
    if ((this.swipeOffsets[id] || 0) < -110) {
      this.remove(id);
      return;
    }

    // возврат назад
    this.swipeOffsets[id] = 0;
  }

  getTransform(id: string) {
    return `translateX(${this.swipeOffsets[id] || 0}px)`;
  }

  getTransition(id: string) {
    return this.isDragging[id] ? 'none' : 'transform 0.2s ease';
  }
}
