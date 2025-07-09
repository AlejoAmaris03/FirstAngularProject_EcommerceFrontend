import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../interfaces/models';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private users_api = "http://localhost:8080/users";
  private http = inject(HttpClient);

  public getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.users_api);
  }

  public getUserById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(this.users_api + '/find/' + id);
  }

  public registerUser(data: FormData): Observable<UserModel> {
    return this.http.post<UserModel>(this.users_api + "/register", data);
  }

  public deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(this.users_api + "/delete/" + id);
  }
}
