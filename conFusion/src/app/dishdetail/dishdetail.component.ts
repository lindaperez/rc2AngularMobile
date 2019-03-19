import { Component, OnInit } from '@angular/core';
import { Dish} from '../share/dish';
import { Params, ActivatedRoute }  from '@angular/router';
import { Location } from  '@angular/common';
import { DishService} from '../services/dish.service';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})


export class DishdetailComponent implements OnInit {


  dish: Dish;

  constructor(private dishService: DishService,
              private route:ActivatedRoute,
              private location: Location) {}

  ngOnInit() {
    // dishdetail/0/
    const id = this.route.snapshot.params['id'];
     this.dishService.getDish(id).
     then(dish=>this.dish= dish);

  }
  goBack():void{
    this.location.back();
  }

}
