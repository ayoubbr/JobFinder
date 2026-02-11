import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadFavorites } from '../../states/favorites/favorites.actions';
import { selectFavorites, selectFavoritesLoading } from '../../states/favorites/favorites.selector';
import { Favorite } from '../../core/models/favorite.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  private store = inject(Store);

  favorites$: Observable<Favorite[]> = this.store.select(selectFavorites);
  loading$: Observable<boolean> = this.store.select(selectFavoritesLoading);

  ngOnInit(): void {
    this.store.dispatch(loadFavorites());
  }
}
