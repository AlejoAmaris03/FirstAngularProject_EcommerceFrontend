import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaleModel } from '../../interfaces/models';
import { AuthenticationService } from '../authentication';

@Injectable({
  providedIn: 'root'
})

export class SalesService {
  private sales_api = 'http://localhost:8080/sales';
  private http = inject(HttpClient);

  public getSales(): Observable<SaleModel[]> {
    return this.http.get<SaleModel[]>(this.sales_api);
  }

  public getSaleByReceiptId(id: number): Observable<SaleModel[]> {
    return this.http.get<SaleModel[]>(this.sales_api + '/receipt/' + id);
  }

  public getPurchasesByUserId(id: number): Observable<SaleModel[]> {
    return this.http.get<SaleModel[]>(this.sales_api + '/purchases/' + id);
  }

  public getPurchaseByReceiptId(id: number): Observable<SaleModel[]> {
    return this.http.get<SaleModel[]>(this.sales_api + '/purchases/receipt/' + id);
  }

  public saveSale(formData: FormData): Observable<SaleModel[]> {
    return this.http.post<SaleModel[]>(this.sales_api + "/buy", formData);
  }
}
