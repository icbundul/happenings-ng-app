import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HappeningPlaceService} from '../../services/happening-place.service';
import {HappeningPlace} from '../../domain/HappeningPlace';
import { Location } from '@angular/common';

@Component({
  selector: 'app-happening-place-detail-form',
  templateUrl: './happening-place-detail-form.component.html',
  styleUrls: ['./happening-place-detail-form.component.css']
})
export class HappeningPlaceDetailFormComponent implements OnInit {

  happeningPlace: HappeningPlace;

  constructor(private route: ActivatedRoute, private happeningPlaceService: HappeningPlaceService,
              private location: Location) { }

  ngOnInit() {
    this.happeningPlaceService.getHappeningPlaceById(+this.route.snapshot.params['id'])
      .subscribe(happeningPlace => this.happeningPlace = happeningPlace);
  }

  goBack(): void {
    this.location.back();
  }

}
