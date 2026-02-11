import { favotitesReducer } from './../../states/favorites/favorites.reducer';
import { FavoriteService } from './../../core/services/favorite.service';
import { Component, NgModule, OnInit } from '@angular/core';
import { JobService } from '../../core/services/job.service';
import { Job } from '../../core/models/job.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from '../../core/services/user.service';
import { addFavorite } from '../../states/favorites/favorites.actions';
import { Favorite } from '../../core/models/favorite.model';

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

  isLoading = false;
  favorites: Favorite[] = [];

  constructor(private route: ActivatedRoute,
    private store: Store,
    private userService: UserService,
    private favotiteService: FavoriteService) {
  }

  ngOnInit(): void {
    // this.isLoading = true;
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

  addToFavorites(job: Job) {
    const userId = this.userService.getCurrentUser()?.id!;
    this.store.dispatch(addFavorite({ userId, job }));
  }

}
