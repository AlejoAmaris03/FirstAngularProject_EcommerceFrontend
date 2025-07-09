import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserModel } from '../../../core/interfaces/models';
import { AuthenticationService } from '../../../core/services';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent implements OnInit{
  protected currentUser!: UserModel | null;
  private authService = inject(AuthenticationService);

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
  }
}
