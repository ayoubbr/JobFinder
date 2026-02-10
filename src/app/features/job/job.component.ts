import { Component, NgModule, OnInit } from '@angular/core';
import { JobService } from '../../core/services/job.service';
import { Job } from '../../core/models/job.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

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

  // descending = true;
  // pageCount = 0;


  constructor(private route: ActivatedRoute,
    private jobService: JobService) {
  }

  ngOnInit(): void {
    this.allJobs = this.route.snapshot.data['jobs'];
    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.allJobs;

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


    this.totalPages = Math.ceil(filtered.length / this.pageSize);

    const start = this.page * this.pageSize;
    const end = start + this.pageSize;

    this.jobs = filtered.slice(start, end);
  }



  // applyTitleFilter() {

  //   let filtered = this.allJobs;

  //   const value = this.filterByTitle.toLowerCase().trim();


  //   if (value) {
  //     filtered = filtered.filter(job => job.name.toLowerCase().includes(value));
  //   }

  //   const start = this.page * this.pageSize; // 0
  //   const end = start + this.pageSize; // 25
  //   this.jobs = filtered.slice(start, end); // [ 0, 25 ]

  //   this.totalPages = Math.ceil(filtered.length / this.pageSize);

  // }



  // applyLocationFilter() {
  //   const value = this.filterByLocation.toLowerCase().trim();


  //   if (!value) {
  //     return;
  //   }
  //   this.jobService.getAll(this.page, false, value).subscribe({
  //     next: (res) => {
  //       this.allJobs = res.results;
  //       this.applyTitleFilter();
  //     },
  //     error: (err) => {
  //       console.error('Something is wrong: ', err);
  //     }
  //   })
  // }

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

}
