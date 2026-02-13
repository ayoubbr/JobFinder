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

  acceptApplication(id: number) {
    this.applicationService.accept(id).subscribe({
      next: (updatedApp) => {
        const index = this.applications.findIndex(app => app.id === id);
        if (index !== -1) {
          this.applications[index].status = 'accepted';
        }
        console.log("Job with id: " + id + " is Accepted");
      },
      error: (err) => console.error('Error accepting application:', err)
    });
  }

  rejectApplication(id: number) {
    this.applicationService.reject(id).subscribe({
      next: (updatedApp) => {
        const index = this.applications.findIndex(app => app.id === id);
        if (index !== -1) {
          this.applications[index].status = 'rejected';
        }
        console.log("Job with id: " + id + " is Rejected");
      },
      error: (err) => console.error('Error rejecting application:', err)
    });
  }
}
