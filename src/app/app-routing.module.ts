import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HappeningsComponent } from './happenings/happenings.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {NotFoundComponent} from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HappeningDetailComponent } from './happenings/happening-detail/happening-detail.component';
import {HappeningPlaceDetailFormSimpleComponent} from './happening-place/happening-place-detail-form-simple/happening-place-detail-form-simple.component';


const routes: Routes = [
  { path: 'happenings', component: HappeningsComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'new', component: HappeningDetailComponent },
  { path: 'happeningplace/:id', component: HappeningPlaceDetailFormSimpleComponent},
  { path: 'detail/:id', component: HappeningDetailComponent },
  { path: '', component: HappeningsComponent, pathMatch: 'full' },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
