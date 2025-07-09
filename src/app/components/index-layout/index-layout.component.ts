import { Component } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-index-layout',
  imports: [
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './index-layout.component.html',
  styleUrl: './index-layout.component.css'
})

export default class IndexLayoutComponent {

}
