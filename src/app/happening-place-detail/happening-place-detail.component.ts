import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HappeningPlace} from '../domain/HappeningPlace';

@Component({
  selector: 'app-happening-place-detail',
  templateUrl: './happening-place-detail.component.html',
  styleUrls: ['./happening-place-detail.component.css']
})
export class HappeningPlaceDetailComponent implements OnInit {

  @Input() happeningPlaceSelected: HappeningPlace;

  // TODO do something when HappeningPlace is edited and changed, add message when selected

  constructor() { }

  ngOnInit() {
  }

}
