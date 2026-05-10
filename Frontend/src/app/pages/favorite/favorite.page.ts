import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { FavoriteService } from '../../services/favorite/favorite-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Favorite } from '../../interface/favorite.interface';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonContent, CommonModule, FormsModule],
})
export class FavoritePage implements OnInit {
  private favoriteService = inject(FavoriteService);

  // Теперь просто читаем signal из сервиса
  favorites = this.favoriteService.favorites;

  ngOnInit() {
    // Первый загрузка
    this.favoriteService.getFavorites().subscribe();
  }

  remove(id: string) {
    this.favoriteService.removeFromFavorites(id).subscribe();
    // Обновление уже произойдёт автоматически через pipe(tap)
  }
}
