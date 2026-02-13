import { UserService } from './../../core/services/user.service';
import { Component } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
