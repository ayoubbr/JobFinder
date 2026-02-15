import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  showPassword = false;

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private router: Router) {
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]]
    })
  }


  login(): void {
    const { email, password } = this.loginForm.value;

    this.userService.login(email, password).subscribe({
      next: user => {
        console.log('Logged in user:', user);
        this.router.navigate(['profile'])
      },
      error: err => {
        alert(err.message);
      }
    })
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
