import {Component} from '@angular/core';
// import { FormioAuthService } from 'ng2-formio/auth';
import { FORM } from './data';

@Component({
  template: require('./home.html')
})

export class HomeComponent {
  private formdata: any = FORM;
  // constructor(public auth: FormioAuthService) {}
}
