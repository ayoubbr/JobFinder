import { Favorite } from './../models/favorite.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  url: string = 'http://localhost:3000/favorites';

  constructor(private http: HttpClient) { }


  create(userId: number, job: any): Observable<any> {
    const payload = {
      userId,
      offerId: job.id,
      title: job.name,
      company: job.company?.name,
      location: job.locations?.[0]?.name
    };
    return this.http.post<any>(this.url, payload);
  }

  getAll(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(this.url);
  }

  findByUserAndJob(userId: number, offerId: number): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.url}?userId=${userId}&offerId=${offerId}`);
  }
}
