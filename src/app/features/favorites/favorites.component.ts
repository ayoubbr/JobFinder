import { removeFavorite } from './../../states/favorites/favorites.actions';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadFavorites } from '../../states/favorites/favorites.actions';
import { selectFavorites, selectFavoritesLoading } from '../../states/favorites/favorites.selector';
import { Favorite } from '../../core/models/favorite.model';
import { RouterLink } from '@angular/router';
import { ApplicationService } from '../../core/services/application.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {

  private store = inject(Store);
  private applicationService = inject(ApplicationService);
  private userService = inject(UserService);

  favorites$: Observable<Favorite[]> = this.store.select(selectFavorites);
  loading$: Observable<boolean> = this.store.select(selectFavoritesLoading);
  applications: any[] = [];

  ngOnInit(): void {
    this.store.dispatch(loadFavorites());
    this.loadUserApplications();
  }

  loadUserApplications() {
    const userId = this.userService.getCurrentUser()?.id;
    if (userId) {
      this.applicationService.getAll().subscribe(apps => {
        this.applications = apps.filter(a => a.userId === userId);
      });
    }
  }

  removeFromFavorites(favorite: Favorite) {
    this.store.dispatch(removeFavorite({ favorite }))
  }

  applyNow(favorite: Favorite) {
    const userId = this.userService.getCurrentUser()?.id;
    if (!userId) return;

    this.applicationService.create(userId, favorite).subscribe({
      next: (newApp) => {
        this.applications.push(newApp);
        console.log('Application added from favorites: ', favorite.offerId);
      },
      error: (err) => console.error('Error adding application: ', err)
    });
  }

  hasApplied(offerId: number): boolean {
    return this.applications.some(a => a.offerId === offerId);
  }
}
