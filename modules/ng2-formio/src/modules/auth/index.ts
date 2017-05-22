import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FormioModule }   from '../../index';
import { FormioAuthComponent }  from './auth.component';
import { FormioAuthLoginComponent } from './login.component';
import { FormioAuthRegisterComponent } from './register.component';

export function FormioAuthRoutes(config?: any): Routes {
  config = config || {};
  return [
    {
      path: '',
      component: config.auth || FormioAuthComponent,
      children: [
        {
          path: '',
          redirectTo: 'login',
          pathMatch: 'full'
        },
        {
          path: 'login',
          component: config.login || FormioAuthLoginComponent
        },
        {
          path: 'register',
          component: config.register || FormioAuthRegisterComponent
        }
      ]
    }
  ];
};

@NgModule({
  imports: [
    CommonModule,
    FormioModule,
    RouterModule.forChild([])
  ],
  declarations: [
    FormioAuthComponent,
    FormioAuthLoginComponent,
    FormioAuthRegisterComponent
  ]
})
export class FormioAuth {}

export { FormioAuthConfig } from './auth.config';
export { FormioAuthService } from './auth.service';
export { FormioAuthComponent }  from './auth.component';
export { FormioAuthLoginComponent } from './login.component';
export { FormioAuthRegisterComponent } from './register.component';
