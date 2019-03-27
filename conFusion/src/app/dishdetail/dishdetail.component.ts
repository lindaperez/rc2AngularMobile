import { Component, OnInit,ViewChild, Inject } from '@angular/core';
import { Dish} from '../share/dish';
import { Params, ActivatedRoute }  from '@angular/router';
import { Location } from  '@angular/common';
import { DishService} from '../services/dish.service';
import { switchMap} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Comment } from '../share/comment';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
      state('shown', style({
        transform: 'scale(1.0)',
        opacity: 1
      })),
      state('hidden', style({
        transform: 'scale(0.9)',
        opacity: 0
      })),
      transition('hidden => shown', animate('0.5s ease-in-out'))
    ])
  ]})


export class DishdetailComponent implements OnInit {


  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  errMess: string;
  dishcopy: Dish;



  //Form objects
  commentRateForm: FormGroup;
  commentRate : Comment;
  @ViewChild('fform') commentRateFormDirective;

  visibility = 'shown';
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
   /*route params ActivatedRoute
    .pipe:: transform data to a desire output
    The impure AsyncPipe
    */
    this.route.params.
    pipe(switchMap((params: Params) => {
      this.visibility = 'hidden'; return this.dishService.getDish(+params['id']); }))
      .subscribe(dish => {
        this.dish = dish;
        this.dishcopy = dish;
        this.setPrevNext(dish.id);
        this.visibility = 'shown';
        },
        errmess => this.errMess = <any>errmess);

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
      this.dishcopy.comments.push(this.commentRate);
      this.dishService.putDish(this.dishcopy)
        .subscribe(dish => {
            this.dish = dish; this.dishcopy = dish;
          },
          errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });

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
