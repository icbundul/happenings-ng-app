import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { HappeningPlace } from '../domain/HappeningPlace';

@Component({
  selector: 'app-happening-place',
  templateUrl: './happening-place.component.html',
  styleUrls: ['./happening-place.component.css']
})
export class HappeningPlaceComponent implements OnInit {

  @Input() happeningPlaces: HappeningPlace[];
  happeningPlace: HappeningPlace;
  @Output() happeningPlaceDeleted: EventEmitter<HappeningPlace> = new EventEmitter<HappeningPlace>();
  @Output() happeningPlaceSelected: EventEmitter<HappeningPlace> = new EventEmitter<HappeningPlace>();


  constructor() { }

  ngOnInit() {
  }

  deleteHappeningPlace(): void {
    this.happeningPlaceDeleted.emit(this.happeningPlace);
  }

  selectHappeningPlace(): void {
    this.happeningPlaceSelected.emit(this.happeningPlace);
  }

}
