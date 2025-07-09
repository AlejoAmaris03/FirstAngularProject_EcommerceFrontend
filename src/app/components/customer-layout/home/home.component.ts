import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService, ProductsService, SalesService } from '../../../core/services';
import { ProductModel } from '../../../core/interfaces/models';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export default class HomeComponent implements OnInit {
  protected form!: FormGroup;
  protected products: ProductModel[] = [];
  private currentUserId = new AuthenticationService().getUser()?.id;
  private productService = inject(ProductsService);
  private saleService = inject(SalesService);
  private fb = inject(FormBuilder);

  get formArray(): FormArray {
    return this.form.get('products') as FormArray;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      userId: [this.currentUserId],
      products: this.fb.array([])
    });

    this.getProducts();
  }

  private getProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products.sort((a, b) => a.id - b.id);
    });
  }

  private resetForm(): void {
    const checkboxes = (document.querySelectorAll("input[type='checkbox']") as NodeListOf<HTMLInputElement>);
    const inputs = (document.querySelectorAll("input[type='number']") as NodeListOf<HTMLInputElement>);
    const quantity = (document.querySelectorAll('.product-quantity') as NodeListOf<HTMLInputElement>);

    checkboxes.forEach(checkbox => checkbox.checked = false);
    inputs.forEach(input => {
      input.value = ''
      input.setAttribute('readonly', 'true');
    });
    quantity.forEach(q => q.textContent = '');
    this.form.reset();
    this.formArray.clear();
  }

  protected getImage(id: number): any {
    return this.productService.getImage(id);
  }

  protected onCheckboxChange(event: Event, item: ProductModel): void {
    const checkbox = event.target as HTMLInputElement;
    const parent = checkbox.closest('.field');
    const quantityInput = parent?.nextElementSibling?.querySelector<HTMLInputElement>("input[type='number']");

    if (checkbox.checked) {
      quantityInput?.removeAttribute('readonly');
      this.formArray.push(this.fb.group({
        product: [item],
        quantity: [0, [Validators.required, Validators.min(1), Validators.max(item.stock)]]
      }));
    }
    else {
      quantityInput?.setAttribute('readonly', 'true');
      quantityInput!.value = '';
      (document.getElementById("product-quantity-" + item.id) as HTMLElement).textContent = '';

      const index = this.formArray.controls.findIndex(ctrl => ctrl.value.product.id === item.id);
      if (index !== -1)
        this.formArray.removeAt(index);
    }
  }

  protected onChangeQuatity(event: Event, item: ProductModel): void {
    const input = event.target as HTMLInputElement;
    let quatity = Number(input.value);

    if (quatity > item.stock)
      quatity = item.stock;
    else if (quatity < 1)
      quatity = 0;

    input.value = String(quatity);
    (document.getElementById("product-quantity-" + item.id) as HTMLElement).textContent = String(quatity);
  }

  protected setQuantities(event: Event, id: number): void {
    const productGroup = this.formArray.controls.find(
      product => product.get('product')?.value.id === id
    ) as FormGroup;

    productGroup.patchValue({
      quantity: Number((event.target as HTMLInputElement).value)
    });
  }

  protected submit(): void {
    if (this.form.valid && this.form.value.products.length > 0){
      const formData = new FormData;

      formData.append("userId", String(this.currentUserId));
      formData.append("products", new Blob(
        [JSON.stringify(this.form.value.products)],
        {type: "application/json"}
      ));

      this.saleService.saveSale(formData).subscribe(sale => {
        alert('Purchase done successfully!');

        this.getProducts();
        this.resetForm();
      });
    }
    else if(this.form.value.products.length < 1)
      alert('Please, select at least one product');
    else 
    alert('Please, fill the quantity fields');
  }
}
