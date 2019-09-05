import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Happening } from '../../domain/Happening';
import { HappeningService } from '../../services/happening.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HappeningPlace } from '../../domain/HappeningPlace';
import { HappeningPlaceService } from '../../services/happening-place.service';
import {HappeningType} from '../../domain/happening-type';

@Component({
  selector: 'app-happening-detail',
  templateUrl: './happening-detail.component.html',
  styleUrls: ['./happening-detail.component.css']
})
export class HappeningDetailComponent implements OnInit {

  @Input() happening: Happening;
  happeningPlaces: HappeningPlace[];
  selectedHappeningPlace: HappeningPlace;
  happeningTypes: HappeningType[];

  constructor(private route: ActivatedRoute,
              private happeningService: HappeningService,
              private happeningPlaceService: HappeningPlaceService,
              private location: Location) { }

  ngOnInit() {
    this.getHappening();
    this.getHappeningPlacesByHappeningId();
    this.getHappeningTypes();
  }

  getCurrentHappeningId(): number {
    return +this.route.snapshot.paramMap.get('id');
  }

  getHappening(): void {

    if (this.getCurrentHappeningId() === 0) {
      this.happening = new Happening();
      return;
    }

    this.happeningService.getHappening(this.getCurrentHappeningId()).subscribe(happening => this.happening = happening);
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
    console.log(formValues);
    this.happeningService.updateHappening(formValues)
      .subscribe(() => this.goBack());
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

    this.happeningPlaceService.addHappeningPlace(happeningPlace)
      .subscribe(res => {

        if (happeningPlace.id != null) {
          const itemIndex = this.happeningPlaces.findIndex(hp => hp.id === happeningPlace.id);
          this.happeningPlaces[itemIndex] = happeningPlace;
        } else {
          this.happeningPlaces.push(happeningPlace);
        }
      });

      this.getHappeningPlacesByHappeningId();
  }

}
