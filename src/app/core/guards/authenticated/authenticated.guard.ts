import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../services';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if(authService.isAuthenticated()){
    if(authService.getUser()!.role.name == "ROLE_ADMIN")
      return router.navigate(['/admin']);
    else 
      return router.navigate(['/home']);
  }

  authService.logout();
  return true;
};
