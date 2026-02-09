import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    })

  }


  login(): void {
    const { email, password } = this.loginForm.value;

    this.userService.login(email, password).subscribe({
      next: user => {
        console.log('Logged in user:', user);
      },
      error: err => {
        alert(err.message);
      }
    })
  }
}
