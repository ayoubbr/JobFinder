import { User } from './../../../core/models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';

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
    private userService: UserService
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

}
