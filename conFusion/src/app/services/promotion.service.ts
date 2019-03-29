import { Injectable } from '@angular/core';
import { Promotion } from '../share/promotion';

import { Observable, of } from 'rxjs';
import { delay} from 'rxjs/operators';
import { ProcessHTTPMsgService} from '../services/process-httpmsg.service';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../share/baseurl';
import { map,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) { }


  getPromotions() : Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions')
      .pipe(catchError(this.processHTTPMsgService.handleError));;
  }

  getPromotion(id: string ) : Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));;
  }

  getFeaturePromotion() : Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));;
  }
}
