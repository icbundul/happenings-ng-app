import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {HappeningPlaceService} from '../../services/happening-place.service';
import {Location} from '@angular/common';
import {HappeningPlace} from '../../domain/HappeningPlace';
import {MainComponent} from '../../shared/main-component';

@Component({
  selector: 'app-happening-place-detail-form-simple',
  templateUrl: './happening-place-detail-form-simple.component.html',
  styleUrls: ['./happening-place-detail-form-simple.component.css']
})
export class HappeningPlaceDetailFormSimpleComponent extends MainComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private happeningPlaceService: HappeningPlaceService,
              private location: Location) {
    super();
  }

  happeningPlace: HappeningPlace;

  ngOnInit() {

    // fetch happening by route
   this.route.params.forEach((params: Params) => {
      this.getHappeningPlaceById(+params['id']);
    });
  }

  getCurrentHappeningPlaceId(): number {
    return +this.route.snapshot.paramMap.get('id');
  }

  getHappeningPlace(): void {
    this.getHappeningPlaceById(this.getCurrentHappeningPlaceId());
  }

  getHappeningPlaceById(id: number): void {

    this.happeningPlaceService.getHappeningPlace(id).subscribe(
      happeningPlace => { this.happeningPlace = happeningPlace;
        console.log(this.happeningPlace); });
  }

  goBack(): void {
    this.location.back();
  }


  save(formValues): void {
    this.happeningPlaceService.saveOrUpdateHappeningPlace(formValues).subscribe();
  }

}
