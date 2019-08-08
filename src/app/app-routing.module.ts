import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HappeningsComponent } from './happenings/happenings.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {NotFoundComponent} from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: 'happenings', component: HappeningsComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: HappeningsComponent },
  { path: '**', component: NotFoundComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
