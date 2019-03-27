import { Component, OnInit,ViewChild, Inject } from '@angular/core';
import { Dish} from '../share/dish';
import { Params, ActivatedRoute }  from '@angular/router';
import { Location } from  '@angular/common';
import { DishService} from '../services/dish.service';
import { switchMap} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Comment } from '../share/comment';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})


export class DishdetailComponent implements OnInit {


  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  errMess: string;

  //Form objects
  commentRateForm: FormGroup;
  commentRate : Comment;
  @ViewChild('fform') commentRateFormDirective;

  formErrors = {
    'author': '',
    'rating': 0,
    'comment': '',
  };

  validationMessages = {
    'author': {
      'required':      'Author is required.',
      'minlength':     'Author must be at least 2 characters long.',
      'maxlength':     'Author cannot be more than 25 characters long.'
    },
    'rating': {
      'required':      'Rating is required.',
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 2 characters long.',
      'maxlength':     'Comment cannot be more than 150 characters long.'
    },

  };









  constructor(private dishService: DishService,
              private route:ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              @Inject('BaseURL') private BaseURL) {
    this.createForm();
  }

  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id)},
        errmess => this.errMess = errmess);
  }


  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goBack():void{
    this.location.back();
  }


  //Form methods

  createForm(){

    this.commentRateForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(25)]],
      rating: [5, Validators.required],
      comment: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(150)]]

    });
    this.commentRateForm.valueChanges
      .subscribe(data=>this.onValueChanged(data));

    this.onValueChanged(); //reset validation Messages

  }
  onSubmit(){

    this.commentRate = this.commentRateForm.value;
    this.commentRate.date= new Date().toISOString();
    console.log(this.commentRate);
    if (this.commentRate) {
      this.dish.comments.push(this.commentRate);
    }
    this.commentRateFormDirective.resetForm();
    this.commentRateForm.reset({
      author: '',
      rating: 5,
      comment:''
    });


  }
  onValueChanged(data?: any) {
    if (!this.commentRateForm) { return; }
    const form = this.commentRateForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
