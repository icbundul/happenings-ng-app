import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {HappeningPlace} from '../domain/HappeningPlace';
import {HappeningPlaceService} from '../services/happening-place.service';
import {NavigationService} from '../services/navigation.service';
import {Happening} from '../domain/Happening';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  searchTerm: string = '';
  foundHappeningPlaces: HappeningPlace[];
  foundHappenings: Happening[];

  constructor(public auth: AuthService,
              private happeningPlaceService: HappeningPlaceService,
              private navigationService: NavigationService) { }

  ngOnInit() {
  }

  searchObjects(searchTerm: string) {

    this.navigationService.searchHappeningPlaces(searchTerm).subscribe
    (
      objects => {
      this.foundHappeningPlaces = objects;
      console.log('---------------------------');
      console.log(this.foundHappeningPlaces);
      }
    );

    this.navigationService.searchHappenings(searchTerm).subscribe
    (
      objects => {
        this.foundHappenings = objects;
        console.log('---------------------------');
        console.log(this.foundHappenings);
      }
    );

  }


}
