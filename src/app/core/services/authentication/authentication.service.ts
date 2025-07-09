import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserModel } from '../../interfaces/models';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private api_auth = "http://localhost:8080/auth";
  private http = inject(HttpClient);
  
  public authenticate(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.api_auth + '/authenticate', user).pipe(
      tap(user => {
        if(user)
          this.setUser(user);
      })
    );
  };

  public register(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.api_auth + '/registerCustomer', user);
  }

  public getUser(): UserModel | null {
    if(typeof window !== 'undefined')
      return JSON.parse(localStorage.getItem('user')!);
    
    return null;
  }

  public setUser(user: UserModel): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public isAuthenticated(): boolean {
    const user = this.getUser();

    if(!user)
      return false;

    const token = user.token;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = payload.exp * 1000;

    return Date.now() < expirationDate;
  }

  public logout(): void {
    if(typeof window !== 'undefined')
      localStorage.removeItem('user');
  }
}
