import { Component, inject, OnInit } from '@angular/core';
import { CategoryModel, ProductModel } from '../../../core/interfaces/models';
import { CategoryService, ProductsService } from '../../../core/services';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export default class DashboardComponent implements OnInit {
  protected products: ProductModel[] = [];
  protected categories: CategoryModel[] = [];
  private productService = inject(ProductsService);
  private categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products.sort((a, b) => a.id - b.id);
    });

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  protected getImage(id: number): void {
    return this.productService.getImage(id);
  }
}
