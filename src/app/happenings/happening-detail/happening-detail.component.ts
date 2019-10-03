import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Happening } from '../../domain/Happening';
import { HappeningService } from '../../services/happening.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HappeningPlace } from '../../domain/HappeningPlace';
import { HappeningPlaceService } from '../../services/happening-place.service';
import {HappeningType} from '../../domain/happening-type';
import {BaseEntity} from '../../domain/BaseEntity';
import {MainComponent} from '../../shared/main-component';

@Component({
  selector: 'app-happening-detail',
  templateUrl: './happening-detail.component.html',
  styleUrls: ['./happening-detail.component.css']
})
export class HappeningDetailComponent extends MainComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private happeningService: HappeningService,
              private happeningPlaceService: HappeningPlaceService,
              private location: Location) {
    super();
  }

  happening: Happening;
  happeningPlaces: HappeningPlace[];
  selectedHappeningPlace: HappeningPlace;
  happeningTypes: HappeningType[];

  ngOnInit() {

    this.getHappeningTypes();
    this.getHappening();
  }

  getCurrentHappeningId(): number {
    return +this.route.snapshot.paramMap.get('id');
  }

  getHappening(): void {

    this.happeningService.getHappening(this.getCurrentHappeningId()).subscribe(
      happening => { this.happening = happening;
        console.log(this.happening); });
  }

  getHappeningTypes(): void {
    this.happeningService.getHappeningTypes()
      .subscribe(happeningTypes => this.happeningTypes = happeningTypes);
  }

  goBack(): void {
     this.location.back();
  }

  cancel(): void {
  }

  save(formValues): void {

    const happeningForSave =  formValues;

    happeningForSave.happeningPlaces = Object.assign([], this.happening.happeningPlaces);

    this.happeningService.updateHappening(happeningForSave)
      .subscribe();
  }

  // ------ HappeningPlace related

  deleteHappeningPlace(happeningPlace: HappeningPlace): void {

    this.happening.happeningPlaces = this.happening.happeningPlaces.filter(hp => hp.id !== happeningPlace.id);
    // this.happeningPlaceService.deleteHappeningPlace(happeningPlace.id).subscribe();
  }

  getHappeningPlacesByHappeningId(): void {

    this.happeningPlaceService.getHappeningPlacesByHappeningId(this.getCurrentHappeningId()).subscribe(
      happeningPlaces => this.happeningPlaces = happeningPlaces);
  }

  onSelectHappeningPlace(happeningPlace: HappeningPlace) {
    this.selectedHappeningPlace = happeningPlace;
  }

  addHappeningPlace(happeningPlace: HappeningPlace): void {

    if (happeningPlace.id != null) {
      const itemIndex = this.happening.happeningPlaces.findIndex(hp => hp.id === happeningPlace.id);
      this.happening.happeningPlaces[itemIndex] = happeningPlace;
    }

    this.happeningPlaces = this.happening.happeningPlaces;
  }
}
