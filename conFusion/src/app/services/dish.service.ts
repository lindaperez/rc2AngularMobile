import { Injectable } from '@angular/core';
import { Dish } from '../share/dish';
import { DISHES } from '../share/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes() : Promise<Dish[]> {
    return new Promise(resolve => {
    //Simulate server latency  with 2 second delay
    setTimeout(()=>resolve(DISHES),2000);
    });
  }

  getDish(id: string ) : Promise<Dish> {

    return new  Promise(resolve => {
      //Simulate server latency  with 2 second delay
      setTimeout(()=>resolve(DISHES.filter((dish)=>(dish.id==id))[0]),2000);
    });
  }
  getFeatureDish() : Promise<Dish> {
  return new Promise(resolve => {
    //Simulate server latency  with 2 second delay
    setTimeout(()=> resolve(DISHES.filter((dish)=>(dish.featured))[0]),2000);
  });
  }
}
