import { inject } from '@angular/core';
import { UserService } from './../services/user.service';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService);
  const router = inject(Router);

  if (!userService.isAuthenticated()) {
    return true;
  }

  router.navigate(['jobs']);
  return false;

};
