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
  showPassword = false;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser()!;

    const decryptedPassword = this.userService.decryptPassword(this.currentUser.password);

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
        decryptedPassword,
        [Validators.required, Validators.minLength(4), Validators.maxLength(12)]
      ]
    });
  }


  updateProfile() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const formValue = this.profileForm.value;

    const encryptedPassword = this.userService.encryptPassword(formValue.password);

    const updatedUser: User = {
      ...this.currentUser,
      ...formValue,
      password: encryptedPassword
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
    this.userService.delete(this.currentUser.id!).subscribe({
      next: () => {
        alert('User deleted successfully');
        this.userService.logout();
        this.router.navigate(['']);
      },
      error: () => {
        console.error('Something was wrong');
      }
    })
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
