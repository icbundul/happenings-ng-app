import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'happenings-ng-app DEMO VERSION (ver 0.01)';

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.checkAuthenticationStatus().subscribe();
  }
}
