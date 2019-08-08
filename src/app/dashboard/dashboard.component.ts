import { Component, OnInit } from '@angular/core';
import { Happening } from '../domain/Happening';
import { HappeningService } from '../services/happening.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  happenings: Happening[] = [];

  constructor(private happeningService: HappeningService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.happeningService.getHappenings()
      .subscribe(happenings => this.happenings = happenings.slice(1, 5));
  }
}
