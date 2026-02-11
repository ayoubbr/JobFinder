import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  url: string = 'http://localhost:3000/applications';

  constructor(private http: HttpClient) { }


  create(userId: number, job: any): Observable<any> {
    const payload = {
      userId,
      offerId: job.id,
      title: job.name,
      company: job.company?.name,
      location: job.locations?.[0]?.name,
      apiSource: "The Muse",
      url: job.refs?.landing_page,
      status: "pending",
      notes: "Notes Will be Set By The User in the Future.",
      dateAdded: new Date()
    };
    return this.http.post<any>(this.url, payload);
  }
}
