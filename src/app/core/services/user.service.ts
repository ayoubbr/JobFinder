import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }


  register(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }
}
