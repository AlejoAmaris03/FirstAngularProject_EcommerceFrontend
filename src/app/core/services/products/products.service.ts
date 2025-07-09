import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductModel } from '../../interfaces/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private products_api = 'http://localhost:8080/products';
  private http = inject(HttpClient);

  public getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.products_api);
  }

  public getProductById(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(this.products_api + "/find/" + id);
  }

  public getImage(id: number): any {
    return this.products_api + '/image/' + id;
  }

  public registerProduct(formData: FormData): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.products_api + '/register', formData);
  }

  public updateProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(this.products_api + '/updateProduct', product);
  }

  public updateImageProduct(formData: FormData): Observable<ProductModel> {
    return this.http.put<ProductModel>(this.products_api + '/updateImageProduct', formData);
  }

  public deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(this.products_api + '/delete/' + id);
  }
}
