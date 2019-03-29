import { Injectable } from '@angular/core';
import { Feedback } from '../share/feedback';
import { delay} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from "@angular/common/http";
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { baseURL} from '../share/baseurl';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  feedback: Feedback;



  constructor(private http: HttpClient,
  private processHTTPMsgService: ProcessHTTPMsgService) {
  }


  submitFeedback(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback/', feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError),delay(2000));
  }
}
