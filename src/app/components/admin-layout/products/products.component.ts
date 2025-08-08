import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryModel, ProductModel } from '../../../core/interfaces/models';
import { CategoryService, ProductsService } from '../../../core/services';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export default class ProductsComponent implements OnInit{
  protected products: ProductModel[] = [];
  protected categories: CategoryModel[] = [];
  protected form!: FormGroup;
  private fb = inject(FormBuilder);
  private productService = inject(ProductsService);
  private categoryService = inject(CategoryService);
  private image!: File;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      stock: ['', Validators.required],
      price: ['', Validators.required],
      image: [null],
      category: ['', Validators.required]
    });

    this.loadProducts();

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products.sort((a, b) => a.id - b.id);
    });
  }

  protected onFileSelected(event: Event): void {
    const file = event.target as HTMLInputElement;
    
    if(file.files && file.files.length > 0) {
      this.image = file.files[0];
      this.form.patchValue({
        image: this.image.name
      });
    }
  }

  protected submit(): void {
    if(this.form.valid && this.image) {
      const formData: FormData = new FormData();

      formData.append('product', new Blob(
        [JSON.stringify(this.form.value)],
        { 'type': 'application/json' }
      ));

      formData.append('image', this.image);

      this.productService.registerProduct(formData).subscribe(() => {
        alert('Product registered successfully');
        this.loadProducts();
        this.form.reset();
      });
    }
    else
      alert('Please fill all required fields');
  }

  protected deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      alert('Product deleted successfully');
      this.loadProducts();
    });
  }
}
