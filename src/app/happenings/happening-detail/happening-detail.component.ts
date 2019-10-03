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

  // compareFn = this._compareFn.bind(this);

  ngOnInit() {

    this.getHappeningTypes();
    this.getHappening();
    // this.getHappeningPlacesByHappeningId();

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

   /* happeningForSave.happeningPlaces(function (value) {
      value.happening = this.happening;
    });*/

    /*for (let happeningPlace of this.happening.happeningPlaces) {
      happeningPlace.happening = this.happening;
      happeningForSave.happeningPlaces.push(happeningPlace);
    }*/

   /*happeningForSave.happeningPlaces.map(function(happeningPlace) {
        return happeningPlace;
    });*/

    this.happeningService.updateHappening(happeningForSave)
      .subscribe();
  }

  // ------ HappeningPlace related

  deleteHappeningPlace(happeningPlace: HappeningPlace): void {

    this.happeningPlaces = this.happeningPlaces.filter(hp => hp.id !== happeningPlace.id);
    this.happeningPlaceService.deleteHappeningPlace(happeningPlace.id).subscribe();
  }

  getHappeningPlacesByHappeningId(): void {

    this.happeningPlaceService.getHappeningPlacesByHappeningId(this.getCurrentHappeningId()).subscribe(
      happeningPlaces => this.happeningPlaces = happeningPlaces);
  }

  onSelectHappeningPlace(happeningPlace: HappeningPlace) {
    this.selectedHappeningPlace = happeningPlace;
  }

  addHappeningPlace(happeningPlace: HappeningPlace): void {

    /*this.happeningPlaceService.addHappeningPlace(happeningPlace)
      .subscribe(res => {

        if (happeningPlace.id != null) {
          const itemIndex = this.happeningPlaces.findIndex(hp => hp.id === happeningPlace.id);
          this.happeningPlaces[itemIndex] = happeningPlace;
        } else {
          this.happeningPlaces.push(happeningPlace);
        }
      });*/

    if (happeningPlace.id != null) {
      const itemIndex = this.happening.happeningPlaces.findIndex(hp => hp.id === happeningPlace.id);
      this.happening.happeningPlaces[itemIndex] = happeningPlace;
    }

    this.happeningPlaces = this.happening.happeningPlaces;
  }

 /* _compareFn(a, b) {
    return a.id === b.id;
  }

/*  compareFn(be1: BaseEntity, be2: BaseEntity): boolean {
    return be1 && be2 ? be1.id === be2.id : be1 === be2;
  }*/

}
