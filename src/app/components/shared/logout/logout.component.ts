import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../../core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})

export class LogoutComponent {
  private authService = inject(AuthenticationService);
  private router = inject(Router);

  protected logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
