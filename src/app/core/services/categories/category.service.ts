import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from '../../interfaces/models';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private categories_api = 'http://localhost:8080/categories';
  private http = inject(HttpClient);

  public getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.categories_api);
  }
}
