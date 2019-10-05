import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HappeningsComponent } from './happenings/happenings.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {NotFoundComponent} from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HappeningDetailComponent } from './happenings/happening-detail/happening-detail.component';
import {HappeningPlaceDetailFormComponent} from './happening-place/happening-place-detail-form/happening-place-detail-form.component';


const routes: Routes = [
  { path: 'happenings', component: HappeningsComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'new', component: HappeningDetailComponent },
  { path: 'detail/:id', component: HappeningDetailComponent },
  { path: 'happeningplaces/:id', component: HappeningPlaceDetailFormComponent},
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
