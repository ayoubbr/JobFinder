import { User } from './../../../core/models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  currentUser!: User;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser()!;

    this.profileForm = this.fb.group({
      firstName: [
        this.currentUser.firstName,
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
      ],
      lastName: [
        this.currentUser.lastName,
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
      ],
      email: [
        this.currentUser.email,
        [Validators.required, Validators.email]
      ],
      password: [
        this.currentUser.password,
        [Validators.required, Validators.minLength(4), Validators.maxLength(12)]
      ]
    });
  }


  updateProfile() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const updatedUser: User = {
      ...this.currentUser,
      ...this.profileForm.value
    };

    this.userService.updateUser(updatedUser).subscribe({
      next: (user) => {
        this.userService.setCurrentUser(user);
        alert('Profile updated successfully');
      },
      error: (err) => {
        console.error('Something is wrong: ', err);
      }
    })
  }

  deleteProfile() {
    if (!this.currentUser || !this.currentUser.id) {
      console.error('User ID is missing');
      return;
    }

    const confirmation = confirm('Are you sure you want to delete your profile? This action is permanent and will remove all your data.');

    if (confirmation) {
      this.userService.delete(this.currentUser.id).subscribe({
        next: () => {
          alert('User deleted successfully');
          this.userService.logout();
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Error during deletion:', err);
          alert('Something went wrong during deletion. Please try again.');
        }
      });
    }
  }



}
