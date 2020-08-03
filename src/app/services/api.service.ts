import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HelpTips, Testimonial } from '../models';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private helpTipsRecords$: Observable<HelpTips[]>;
  private testimonialRecords$: Observable<Testimonial[]>;

  // tslint:disable-next-line: typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient
  ) { }

  getHelpTips(): Observable<HelpTips[]> {
    if (!this.helpTipsRecords$) {
      this.helpTipsRecords$ = this.http
        .get<HelpTips[]>(`${environment.baseUrl}/help-tips`)
        .pipe(
          shareReplay({ bufferSize: 1, refCount: true}),
          catchError(this.handleError('getHelpTips', []))
        );
    }
    return this.helpTipsRecords$;
  }

  getTestimonials(): Observable<Testimonial[]> {
    if (!this.testimonialRecords$) {
      this.testimonialRecords$ = this.http
        .get<Testimonial[]>(`${environment.baseUrl}/testimonial`)
        .pipe(
          shareReplay({ bufferSize: 1, refCount: true}),
          catchError(this.handleError('getTestimonials', []))
        );
    }
    return this.testimonialRecords$;
  }


}
