import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HappeningsComponent } from './happenings/happenings.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {Router, RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HappeningDetailComponent } from './happenings/happening-detail/happening-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HappeningSearchComponent } from './happenings/happening-search/happening-search.component';
import { HappeningPlaceComponent } from './happening-place/happening-place.component';
import { HappeningPlaceDetailComponent } from './happening-place/happening-place-detail/happening-place-detail.component';
import { HappeningPlaceDetailFormComponent } from './happening-place/happening-place-detail-form/happening-place-detail-form.component';
import { AuthService } from './services/auth.service';
import { CollapsibleWellComponent } from './common/collapsible-well/collapsible-well.component';
import { JQ_TOKEN, TOASTR_TOKEN, Toastr } from './services/index';
import { SimpleModalComponent } from './common/simple-modal/simple-modal.component';

let toastr: Toastr = window['toastr'];
let jQuery = window['$'];

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
    HappeningPlaceDetailComponent,
    HappeningPlaceDetailFormComponent,
    CollapsibleWellComponent,
    SimpleModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    AuthService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
