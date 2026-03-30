import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { User } from '../models/user.model';
import * as CryptoJS from 'crypto-js';

const SECRET_KEY = 'job-finder-secret-key';

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

        // Encrypt the password before saving
        const encryptedPassword = CryptoJS.AES.encrypt(user.password, SECRET_KEY).toString();

        return { ...user, password: encryptedPassword };
      }),
      switchMap(userWithEncryptedPassword => {
        return this.http.post<User>(this.url, userWithEncryptedPassword);
      })
    );
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.url}?email=${email}`)
      .pipe(
        map(users => {
          if (users.length === 0) {
            throw new Error('Invalid email or password');
          }

          const user = users[0];

          // Decrypt to verify
          const bytes = CryptoJS.AES.decrypt(user.password, SECRET_KEY);
          const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

          if (decryptedPassword !== password) {
            throw new Error('Invalid email or password');
          }

          this.localStorageService.setUserData(this.STORAGE_KEY, user);
          return user;
        })
      );
  }

  decryptPassword(encryptedPassword: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  encryptPassword(password: string): string {
    return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
  }

  updateUser(user: User): Observable<User> {
    if (!user.id) {
      throw new Error('User ID is missing');
    }
    return this.http.patch<User>(`${this.url}/${user.id}`, user);
  }

  logout(): void {
    this.localStorageService.removeUserData(this.STORAGE_KEY);
  }

  getCurrentUser(): User | null {
    const user = this.localStorageService.getUserData(this.STORAGE_KEY);
    return user;
  }

  setCurrentUser(user: User): void {
    this.localStorageService.setUserData('currentUser', user);
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }


}
