import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../../services';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if(authService.isAuthenticated() && authService.getUser()?.role.name === 'ROLE_ADMIN')
    return true;
  else if(authService.isAuthenticated() && authService.getUser()?.role.name !== 'ROLE_ADMIN')
    return router.navigate(['/']);

  authService.logout();
  return router.navigate(['/']);
};
