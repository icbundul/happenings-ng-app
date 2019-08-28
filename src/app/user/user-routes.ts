import { UserProfileComponent } from './user-profile/user-profile.component';
import {Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';

export const userRoutes: Routes = [
  { path: 'profile', component: UserProfileComponent },
  { path: 'login', component: LoginComponent }
 ];
