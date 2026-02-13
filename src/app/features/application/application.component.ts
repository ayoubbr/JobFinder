import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../core/services/application.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent implements OnInit {

  applications: any[] = [];
  isLoading = true;

  constructor(private applicationService: ApplicationService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications() {
    const userId = this.userService.getCurrentUser()?.id;
    if (userId) {
      this.applicationService.getAll().subscribe({
        next: (apps) => {
          this.applications = apps.filter(a => a.userId === userId);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading applications:', err);
          this.isLoading = false;
        }
      });
    }
  }

  removeApplication(id: number) {
    this.applicationService.delete(id).subscribe({
      next: () => {
        this.applications = this.applications.filter(a => a.id !== id);
      },
      error: (err) => console.error('Error removing application:', err)
    });
  }
}
