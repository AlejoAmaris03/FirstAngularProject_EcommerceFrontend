import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleModel } from '../../interfaces/models';

@Injectable({
  providedIn: 'root'
})

export class RoleService {
  private role_api = "http://localhost:8080/roles";
  private https = inject(HttpClient);

  public getRoles(): Observable<RoleModel[]> {
    return this.https.get<RoleModel[]>(this.role_api);
  }
}
