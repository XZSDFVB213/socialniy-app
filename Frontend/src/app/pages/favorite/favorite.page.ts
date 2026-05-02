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
  ngOnInit() {
    this.favoriteService.getFavorites().subscribe((res) => {
      this.favorites.set(res as Favorite[]);
      console.log(res);
    });
  }
  private favoriteService = inject(FavoriteService);

  favorites = signal<Favorite[]>([]);
  remove(id: string) {
    this.favoriteService.removeFromFavorites(id).subscribe(() => {
      this.favorites.update((list) => list.filter((f) => f.id !== id));
    });
  }
}
