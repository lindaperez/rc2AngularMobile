import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Feedback,ContactType} from '../share/feedback';
import { FeedbackService } from '../services/feedback.service';
import { dissapear,  change } from '../animations/app.animation';
import { timeout,delay } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [ dissapear(), change() ]
})
export class ContactComponent implements OnInit {



  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackCopy: Feedback;
  contactType=ContactType;
  @ViewChild('fform') feedbackFormDirective;
  errMess: string;
  returned: string;
  dissapear = 'hidden';
  change: string;





  formErrors = {
    'firstname':'',
    'lastname':'',
    'tenum':'',
    'email':'',
    'message':''

  };
  validationMessages = {
    'firstname': {
      'required': 'First name is required.',
      'minLenght' : 'First name must be at least 2 characters long',
      'maxLenght' : 'First name can not be more than 25 characters long',
    },
    'lastname': {
      'required': 'Last name is required.',
      'minLenght' : 'Last name must be at least 2 characters long',
      'maxLenght' : 'Last name can not be more than 25 characters long',
    },
    'telnum': {
      'required': 'Tel. Num name is required.',
      'pattern' : 'Tel. Num must contain only numbers'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format'

    },
    'message': {
      'required': 'Message is required.',

    }

};

  constructor(private fb: FormBuilder,
              private feedbackService: FeedbackService,
              @Inject('BaseURL') private BaseURL) {

      this.createForm();
  }

  ngOnInit() {
  }


  createForm (){
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(25)]],
      telnum: [0, [Validators.required,Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: [false, Validators.required],
      contacttype: ['None', Validators.required],
      message: ['', Validators.required],
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data),
        errmess => this.errMess = errmess);
    this.onValueChanged(); //(re)set form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
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


  onSubmit(){
    this.returned = 'waiting';
    this.change = 'hidden';
    this.dissapear = 'hidden';

    console.log(this.returned);
    this.feedback = this.feedbackForm.value;

    console.log(this.feedback);

    if(this.feedback){
      this.feedbackService.submitFeedback(this.feedback)
        .subscribe(feedback => {
            this.feedback = feedback;
            this.feedbackCopy = feedback;
            this.returned = 'done';
            this.dissapear = 'shown';
            console.log(this.returned);
            setTimeout(()=>{
              this.dissapear = 'hidden';
              this.returned = 'initial';
              this.change = 'shown';
              console.log(this.returned);
            }, 5000);

          },
          errmess => { this.feedback = null;
                     this.feedbackCopy=null;
                     this.errMess = <any>errmess; });


    }

    console.log(this.returned);
    this.feedbackFormDirective.resetForm();
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''

    });

  }
}
