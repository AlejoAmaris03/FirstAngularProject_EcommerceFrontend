import { Component, inject, OnInit } from '@angular/core';
import { ProductsService, SalesService, UserService } from '../../../core/services';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export default class HomeComponent implements OnInit {
  private userService = inject(UserService);
  private productService = inject(ProductsService);
  private saleService = inject(SalesService);

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      (document.getElementById('users-quantity') as HTMLElement).textContent = users.length ? '' + (users.length - 1) : '0';
    });

    this.productService.getProducts().subscribe(products => {
      (document.getElementById('products-quantity') as HTMLElement).textContent = products.length ? '' + (products.length) : '0';
    });

    this.saleService.getSales().subscribe(sales => {
      (document.getElementById('sales-quantity') as HTMLElement).textContent = sales.length ? '' + (sales.length) : '0';
    });
  }
}
