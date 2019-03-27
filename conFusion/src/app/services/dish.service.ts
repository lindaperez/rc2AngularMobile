import { Injectable } from '@angular/core';
import { Dish } from '../share/dish';

import { Observable, of } from 'rxjs';
import { delay} from 'rxjs/operators';


import { HttpClient } from '@angular/common/http';
import { baseURL } from '../share/baseurl';
import { map, catchError} from 'rxjs/operators';
import { ProcessHTTPMsgService} from '../services/process-httpmsg.service';



@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,
  private ProcessHTTPMsgService: ProcessHTTPMsgService) { }


  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
      .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error=>error));
  }

}
