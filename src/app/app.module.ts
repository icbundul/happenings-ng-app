import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HappeningsComponent } from './happenings/happenings.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {Router, RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HappeningDetailComponent } from './happening-detail/happening-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HappeningSearchComponent } from './happening-search/happening-search.component';
import { HappeningPlaceComponent } from './happening-place/happening-place.component';
import { HappeningPlaceDetailComponent } from './happening-place-detail/happening-place-detail.component';

/*
const appRoutes :Routes =  [
  {
    path: 'happenings',
    component:HappeningsComponent
  },
  {
    path: 'feedback',
    component: FeedbackComponent
  },
  {
    path:'',
    component:HappeningsComponent,
    pathMatch:'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
*/

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FeedbackComponent,
    HappeningsComponent,
    NotFoundComponent,
    HappeningDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HappeningSearchComponent,
    HappeningPlaceComponent,
    HappeningPlaceDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
