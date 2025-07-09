import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService, ProductsService } from '../../../../core/services';
import { CategoryModel, ProductModel } from '../../../../core/interfaces/models';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})

export default class EditProductComponent implements OnInit{
  protected product!: ProductModel;
  protected categories: CategoryModel[] = [];
  protected productForm!: FormGroup;
  protected imageForm!: FormGroup;
  private route = inject(ActivatedRoute);
  protected productId = Number(this.route.snapshot.paramMap.get('id'));
  private productService = inject(ProductsService);
  private categoryService = inject(CategoryService);
  private fb = inject(FormBuilder);
  private newImage!: File;
  protected image = this.productService.getImage(this.productId);

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      stock: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required]
    });

    this.imageForm = this.fb.group({
      image: ['', Validators.required]
    });

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.productService.getProductById(this.productId).subscribe(product => {
      this.product = product;

      (document.getElementById('product-name') as HTMLElement).textContent = `Update: ${this.product.name}`;
      this.productForm.setValue({
        id: this.product.id,
        name: this.product.name,
        description: this.product.description,
        stock: this.product.stock,
        price: this.product.price,
        category: this.categories.find(c => c.id === this.product.category.id)
      });
    });
  }

  protected onFileSelected(event: Event): void {
    const file = event.target as HTMLInputElement;
    
    if(file.files && file.files.length > 0) {
      this.newImage = file.files[0];
      this.imageForm.patchValue({
        image: this.newImage.name
      });
      this.imageForm.controls['image'].markAsTouched();
    }
  }

  protected updateProduct(): void {
    if(this.productForm.valid) {
      this.productService.updateProduct(this.productForm.value).subscribe(() => {
        alert("Product information updated successfully!");
        window.location.href =  `/admin/product/selected/${this.productId}`;
      });
    }
    else 
      alert("Please fill all the fields correctly");
  }

  protected updateImage(): void {
    if(this.imageForm.valid) {
      const formData = new FormData();
      formData.append('productId', this.productId.toString());
      formData.append('image', this.newImage);

      this.productService.updateImageProduct(formData).subscribe(() => {
        alert("Product image updated successfully!");
        window.location.href =  `/admin/product/selected/${this.productId}`;
      });
    }
    else 
      alert("Please select an image to update");
  }
}
