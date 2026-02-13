import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job, JobResponse } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  url: string = 'https://www.themuse.com/api/public/jobs';

  constructor(private http: HttpClient) { }


  getAll(page: number, descending: boolean, location?: string): Observable<JobResponse> {

    let params: any = { page, descending };

    // Search by location just in front-end to go with the title search 
    // Need this later in case i change the api source
    // if (location && location.trim() !== '') {
    //   params.location = location;
    // }

    return this.http.get<JobResponse>(this.url, { params } );
  }

}
