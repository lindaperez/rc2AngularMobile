import { Injectable } from '@angular/core';
import { Dish } from '../share/dish';
import { DISHES } from '../share/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes() : Dish[] {
    return DISHES;
  }

  getDish(id: string ) : Dish {

    return DISHES.filter((dish)=>(dish.id==id))[0];
  }
  getFeatureDish() : Dish {
  return DISHES.filter((dish)=>(dish.featured))[0];
  }
}
