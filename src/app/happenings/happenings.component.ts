import { Component, OnInit } from '@angular/core';
import {Happening} from "../domain/Happening";
import {HAPPENINGS} from '../mock-happenings';

@Component({
  selector: 'app-happenings',
  templateUrl: './happenings.component.html',
  styleUrls: ['./happenings.component.css']
})
export class HappeningsComponent implements OnInit {

  happenings = HAPPENINGS;
  selectedHappening: Happening;

  constructor() { }

  ngOnInit() {
  }

  onSelect(happening: Happening) {
    this.selectedHappening = happening;
  }

}
