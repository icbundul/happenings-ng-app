import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {HappeningPlace} from '../domain/HappeningPlace';
import {HappeningPlaceService} from '../services/happening-place.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  searchTerm: string = '';
  foundHappeningPlaces: HappeningPlace[];

  constructor(public auth: AuthService, private happeningPlaceService: HappeningPlaceService) { }

  ngOnInit() {
  }

  searchObjects(searchTerm: string) {
    this.happeningPlaceService.searchHappeningPlaces(searchTerm).subscribe
    (
      objects => {
      this.foundHappeningPlaces = objects;
      console.log('---------------------------');
      console.log(this.foundHappeningPlaces);
      }
    );
  }

}
