import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'http://localhost:3000/users';

  private STORAGE_KEY = 'currentUser';

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }


  register(user: User): Observable<User> {
    return this.http.get<User[]>(`${this.url}?email=${user.email}`).pipe(
      map(users => {
        if (users.length > 0) {
          throw new Error('Email already exists');
        }
        return user;
      }),
      switchMap(validUser => {
        return this.http.post<User>(this.url, validUser);
      })
    );
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.url}?email=${email}&password=${password}`)
      .pipe(
        map(users => {
          if (users.length === 0) {
            throw new Error('Invalid email or password');
          }

          const user = users[0];
          this.localStorageService.setUserData(this.STORAGE_KEY, user);
          return user;
        })
      );
  }


  logout(): void {
    this.localStorageService.removeUserData(this.STORAGE_KEY);
  }

  getCurrentUser(): User | null {
    const user = this.localStorageService.getUserData(this.STORAGE_KEY);
    return user;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
}
