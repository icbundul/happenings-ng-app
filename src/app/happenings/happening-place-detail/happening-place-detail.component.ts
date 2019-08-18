import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HappeningPlace} from '../../domain/HappeningPlace';

@Component({
  selector: 'app-happening-place-detail',
  templateUrl: './happening-place-detail.component.html',
  styleUrls: ['./happening-place-detail.component.css']
})
export class HappeningPlaceDetailComponent implements OnInit {

  @Input() happeningPlaceSelected: HappeningPlace;
  @Output() happeningPlaceAdd: EventEmitter<HappeningPlace> = new EventEmitter<HappeningPlace>();
  happeningPlace: HappeningPlace;

  // TODO do something when HappeningPlace is edited and changed, add message when selected

  constructor() { }

  ngOnInit() {
    if (this.happeningPlaceSelected == null) {
      this.happeningPlaceSelected = new HappeningPlace();
    }
  }

  addHappeningPlaceFromChild(happeningPlace: HappeningPlace): void {
    this.happeningPlaceAdd.emit(happeningPlace);
  }

  testMethod(): void {
    console.log('----> Test metoda za test nove funkcijonalnosti inputa iz parenta u child');
  }

}
