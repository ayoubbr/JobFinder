import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin, map, Observable } from 'rxjs';
import { JobService } from '../../core/services/job.service';
import { Job } from '../../core/models/job.model';

@Injectable({ providedIn: 'root' })
export class JobsResolver implements Resolve<Job[]> {

    constructor(private jobService: JobService) { }

    resolve(): Observable<Job[]> {
        // fetching first 5 pages (20 jobs each) => 100 jobs
        const requests = [];
        for (let page = 0; page < 5; page++) {
            requests.push(this.jobService.getAll(page, true));
        }

        return forkJoin(requests).pipe(
            map(responses => responses.flatMap(r => r.results))
        );
    }
}
