import { Injectable } from '@angular/core';
import { Promotion } from '../share/promotion';
import { PROMOTIONS } from '../share/promotions';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }


  getPromotions() : Promotion[] {
    return PROMOTIONS;
  }

  getPromotion(id: string ) : Promotion {

    return PROMOTIONS.filter((promo)=>(promo.id==id))[0];
  }
  getFeaturePromotion() : Promotion {
    return PROMOTIONS.filter((promo)=>(promo.feature))[0];
  }
}
