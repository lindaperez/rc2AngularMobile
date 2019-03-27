import { Component, OnInit, Inject } from '@angular/core';
import {Dish} from '../share/dish';
import {DishService} from '../services/dish.service';
import { Promotion } from '../share/promotion';
import { PromotionService} from '../services/promotion.service';
import { Leader } from '../share/leader';
import { LeaderService } from '../services/leader.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion : Promotion;
  featuredLeader: Leader;
  errMess: string;

  constructor(private dishService: DishService,
              private promotionService: PromotionService,
              private leaderService: LeaderService,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {

    this.dishService.getFeaturedDish()
      .subscribe(dish =>  this.dish =dish,
        errmess => this.errMess = <any>errmess);
    this.promotionService.getFeaturePromotion()
      .subscribe(promotion => this.promotion = promotion,
        errmess => this.errMess = <any>errmess);
     this.leaderService.getFeaturedLeader()
       .subscribe(featuredLeader=>this.featuredLeader = featuredLeader,
       errmess => this.errMess = <any>errmess);
  }

}
