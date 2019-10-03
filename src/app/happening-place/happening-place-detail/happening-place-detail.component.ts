import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HappeningPlace} from '../../domain/HappeningPlace';
import {Happening} from '../../domain/Happening';

@Component({
  selector: 'app-happening-place-detail',
  templateUrl: './happening-place-detail.component.html',
  styleUrls: ['./happening-place-detail.component.css']
})
export class HappeningPlaceDetailComponent implements OnInit {

  @Input() happening: Happening;
  @Output() happeningPlaceAdd: EventEmitter<HappeningPlace> = new EventEmitter<HappeningPlace>();
  happeningPlace: HappeningPlace;

  constructor() { }

  ngOnInit() {
    if (this.happeningPlace == null) {
      this.happeningPlace = new HappeningPlace();
    }
    this.happeningPlace.happeningId = this.happening.id;
  }

  addHappeningPlaceFromChild(happeningPlace: HappeningPlace): void {
    happeningPlace.happeningId = this.happening.id;
    this.happening.happeningPlaces.push(happeningPlace);
    this.happeningPlaceAdd.emit(happeningPlace);
  }

  testMethod(): void {
    console.log('----> Test metoda za test nove funkcijonalnosti inputa iz parenta u child');
  }

}
