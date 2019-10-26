import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HappeningPlaceService} from '../../services/happening-place.service';
import {HappeningPlace} from '../../domain/HappeningPlace';
import { Location } from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { restrictedWords } from '../../shared/index';

@Component({
  selector: 'app-happening-place-detail-form',
  templateUrl: './happening-place-detail-form.component.html',
  styleUrls: ['./happening-place-detail-form.component.css']
})
export class HappeningPlaceDetailFormComponent implements OnInit {

  happeningPlace: HappeningPlace;
  newHappeningPlaceForm: FormGroup;

  placeName: FormControl;
  address: FormControl;
  locationX: FormControl;
  locationY: FormControl;
  dateFrom: FormControl;
  dateTo: FormControl;
  notes: FormControl;

  constructor(private route: ActivatedRoute, private happeningPlaceService: HappeningPlaceService,
              private location: Location) { }

  ngOnInit() {

     this.happeningPlaceService.getHappeningPlace(+this.route.snapshot.params['id'])
      .subscribe(happeningPlace => this.happeningPlace = happeningPlace);


    this.placeName = new FormControl('', Validators.required);
    this.address = new FormControl('', Validators.required);
    this.locationX = new FormControl('', Validators.required);
    this.locationY = new FormControl('', Validators.required);
    this.dateFrom = new FormControl('', Validators.required);
    this.dateTo = new FormControl('', Validators.required);
    this.notes = new FormControl('', [Validators.required, Validators.maxLength(400),
      restrictedWords(['foo', 'bar', 'jebiga'])]);

    this.newHappeningPlaceForm = new FormGroup({
      placeName: this.placeName,
      address: this.address,
      locationX: this.locationX,
      locationY: this.locationY,
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
      notes: this.notes,
    });
  }

  save(formValues) {

    const happeningPlace: HappeningPlace = {
      placeName: formValues.placeName,
      address: formValues.address,
      locationX: +formValues.locationX,
      locationY: +formValues.locationY,
      dateFrom: formValues.dateFrom,
      dateTo: formValues.dateTo,
      notes: formValues.notes,
      orderNumber: undefined,
      happening: this.happeningPlace.happening,
      id: undefined,
      createdDatetime: undefined,
      createdBy: undefined,
      lastUpdatedBy: undefined,
      lastUpdatedDateTime: undefined
    };

    console.log(formValues);
  }

  goBack(): void {
    this.location.back();
  }

  cancel(): void {
    this.location.back();
  }

}
