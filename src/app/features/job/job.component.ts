import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from '../../core/services/user.service';
import { FavoriteService } from '../../core/services/favorite.service';
import { Job } from '../../core/models/job.model';
import { addFavorite, loadFavorites, removeFavorite } from '../../states/favorites/favorites.actions';
import { Favorite } from '../../core/models/favorite.model';
import { selectFavorites } from '../../states/favorites/favorites.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent implements OnInit {

  jobs: Job[] = [];
  allJobs: Job[] = [];

  page = 0;
  pageSize = 20;

  filterByTitle = '';
  filterByLocation = '';

  totalPages = 0;

  private store = inject(Store);
  isLoading = false;
  favorites$: Observable<Favorite[]> = this.store.select(selectFavorites);

  constructor(private route: ActivatedRoute,
    public userService: UserService,
    private favoriteService: FavoriteService) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadFavorites());
    const jobs = this.route.snapshot.data['jobs'];
    this.allJobs = Array.isArray(jobs) ? jobs : [];
    this.applyFilters();
  }

  applyFilters() {
    this.isLoading = true;
    setTimeout(() => {
      let filtered = [...this.allJobs];

      const title = this.filterByTitle.toLowerCase().trim();
      const location = this.filterByLocation.toLowerCase().trim();

      if (title) {
        filtered = filtered.filter(job =>
          job.name.toLowerCase().includes(title)
        );
      }

      if (location) {
        filtered = filtered.filter(job =>
          job.locations.some(
            loc => loc.name.toLowerCase().includes(location)
          )
        );
      }

      filtered.sort((a, b) =>
        new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime()
      );

      this.totalPages = Math.ceil(filtered.length / this.pageSize);

      const start = this.page * this.pageSize;
      const end = start + this.pageSize;

      this.jobs = filtered.slice(start, end);
      this.isLoading = false;
    }, 1000);
  }

  onFilterChange() {
    this.page = 0;
    this.applyFilters();
  }

  goToPage(pageNumber: number) {
    if (pageNumber < 0 || pageNumber >= this.totalPages) {
      return;
    }

    this.page = pageNumber;
    this.applyFilters();
  }

  toggleFavorite(job: Job, favorites: Favorite[] | null) {
    if (!favorites) return;

    const existingFavorite = favorites.find(f => f.offerId === job.id);
    const userId = this.userService.getCurrentUser()?.id;

    if (!userId) return;

    if (existingFavorite) {
      this.store.dispatch(removeFavorite({ favorite: existingFavorite }));
    } else {
      this.store.dispatch(addFavorite({ userId, job }));
    }
  }

  isFavorite(jobId: number, favorites: Favorite[] | null): boolean {
    if (!favorites) return false;
    return favorites.some(f => f.offerId === jobId);
  }

}
