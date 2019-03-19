import { Injectable } from '@angular/core';
import { Promotion } from '../share/promotion';
import { PROMOTIONS } from '../share/promotions';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }


  getPromotions() : Promise<Promotion[]> {
    return new Promise(resolve => {
      setTimeout(()=>resolve(PROMOTIONS),2000);
    });
  }

  getPromotion(id: string ) : Promise<Promotion> {

    return new Promise(resolve => {
      setTimeout(()=>resolve( PROMOTIONS.filter((promo)=>(promo.id==id))[0]),2000);
    });
  }
  getFeaturePromotion() : Promise<Promotion> {
    return new Promise(resolve=>{
      setTimeout(()=>resolve( PROMOTIONS.filter((promo)=>(promo.feature))[0]),2000);
    });
  }
}
