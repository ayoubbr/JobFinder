import { UserService } from './../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private localStroageService: LocalStorageService) { }


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const user = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }

    this.userService.register(this.registerForm.value).subscribe(
      {
        next: (createdUser) => {
          console.log('User created: ', createdUser);
          this.registerForm.reset();
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Registration failed', err);
        }
      }
    );
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}
