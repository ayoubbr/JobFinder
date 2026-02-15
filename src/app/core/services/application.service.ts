import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  url: string = 'http://localhost:3000/applications';

  constructor(private http: HttpClient) { }


  create(userId: number, item: any): Observable<any> {
    const payload = {
      userId,
      offerId: item.offerId || item.id,
      title: item.title || item.name,
      company: item.company?.name || item.company,
      location: item.locations?.[0]?.name || item.location,
      apiSource: "The Muse",
      url: item.refs?.landing_page || item.url || "",
      status: "pending",
      notes: "Notes Will be Set By The User in the Future.",
      dateAdded: new Date()
    };
    return this.http.post<any>(this.url, payload);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  findByUserAndJob(userId: number, offerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}?userId=${userId}&offerId=${offerId}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  reject(id: number): Observable<any> {
    return this.http.patch<any>(`${this.url}/${id}`, { status: 'rejected' });
  }

  accept(id: number): Observable<any> {
    return this.http.patch<any>(`${this.url}/${id}`, { status: 'accepted' });
  }
}
