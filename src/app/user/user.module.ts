import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { userRoutes } from './user-routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(userRoutes)
  ],
  providers: [

  ]
})
export class UserModule { }
