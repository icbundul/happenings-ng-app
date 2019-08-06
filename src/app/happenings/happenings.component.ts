import { Component, OnInit } from '@angular/core';
import { Happening } from '../domain/Happening';
import { HappeningService } from '../services/happening.service';

@Component({
  selector: 'app-happenings',
  templateUrl: './happenings.component.html',
  styleUrls: ['./happenings.component.css']
})
export class HappeningsComponent implements OnInit {

  happenings: Happening[];

  selectedHappening: Happening;

  constructor(private happeningService: HappeningService) { }

  ngOnInit() {
    this.getHappenings();
  }

  onSelect(happening: Happening) {
    this.selectedHappening = happening;
  }

  getHappenings(): void {
    this.happenings = this.happeningService.getHappenings();
  }

}
