import { Injectable } from '@angular/core';
import { Promotion } from '../share/promotion';

import { Observable, of } from 'rxjs';
import { delay} from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { baseURL } from '../share/baseurl';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient) { }


  getPromotions() : Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions');
  }

  getPromotion(id: string ) : Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id);
  }

  getFeaturePromotion() : Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]));
  }
}
