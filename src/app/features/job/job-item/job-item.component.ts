import { Component, Input } from '@angular/core';
import { Job } from '../../../core/models/job.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-item.component.html',
  styleUrl: './job-item.component.css'
})
export class JobItemComponent {

  @Input() job!: Job;
  @Input() isAuthenticated = false;
  @Input() isFavorite = false;
  @Input() hasApplied = false;

  @Input() toggleFavorite!: (job: Job) => void;
  @Input() toggleApplication!: (job: Job) => void;


}
