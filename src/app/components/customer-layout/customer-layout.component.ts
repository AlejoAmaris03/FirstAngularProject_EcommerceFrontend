import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer-layout',
  imports: [
    NavbarComponent,
    SidebarComponent,
    RouterOutlet
  ],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})

export default class CustomerLayoutComponent {

}
