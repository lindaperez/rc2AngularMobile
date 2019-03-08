import { Component, OnInit } from '@angular/core';
import {Dish} from '../share/dish';
import {DishService} from '../services/dish.service';
import { Promotion } from '../share/promotion';
import { PromotionService} from '../services/promotion.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion : Promotion;

  constructor(private dishService: DishService,
  private promotionService: PromotionService) { }

  ngOnInit() {

    this.dish = this.dishService.getFeatureDish();
    this.promotion = this.promotionService.getFeaturePromotion();
  }

}
