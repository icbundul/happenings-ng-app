import { Component, OnInit } from '@angular/core';
import { Happening } from '../domain/Happening';
import { HappeningService } from '../services/happening.service';
import {HappeningType} from '../domain/happening-type';

@Component({
  selector: 'app-happenings',
  templateUrl: './happenings.component.html',
  styleUrls: ['./happenings.component.css']
})
export class HappeningsComponent implements OnInit {

  happenings: Happening[];
  filterBy = 'all';
  sortBy = '';
  happeningTypes: HappeningType[];
  visibleHappenings: Happening[] = [];
  happeningType: HappeningType;

  /*selectedHappening: Happening;*/

  constructor(private happeningService: HappeningService) { }

  ngOnInit() {
    this.getHappenings();
    this.getHappeningTypes();
  }

  getHappenings(): void {
    this.happeningService.getHappenings()
      .subscribe(happenings => {this.happenings = happenings;
                      this.visibleHappenings = this.happenings.slice(0);
      });
  }

  getHappeningTypes(): void {
    this.happeningService.getHappeningTypes()
      .subscribe(happeningTypes => this.happeningTypes = happeningTypes);
  }

  add(name: string): void {
    name = name.trim();

    if (!name) {
      return;
    }

    this.happeningService.addHappening({ name } as Happening)
      .subscribe(happening => {
        this.happenings.push(happening);
      });
  }

  delete(happening: Happening): void {

    if (confirm('Are you sure you want to delete this happening?')) {
      this.happenings = this.happenings.filter(h => h !== happening);
      this.visibleHappenings = this.happenings.filter(vh => vh !== happening);
      this.happeningService.deleteHappening(happening).subscribe();
    }
  }

  quickFilterHappeningByHappeningTypeName(happeningTypeName: string) {

    if (!this.happenings) {
      return;
    }

    if (happeningTypeName === 'all') {
      this.visibleHappenings = this.happenings.slice(0);
      this.filterBy = 'all';
    } else {
      this.happeningType = this.happeningTypes
        .filter(happeningType =>
          happeningType.name === happeningTypeName)[0];

      this.visibleHappenings = this.happenings
        .filter(x => x.happeningType !== null)
        .filter(x => {
          return x.happeningType.id === this.happeningType.id;
      });
      this.filterBy = this.happeningType.name;
    }
  }

  quickFilterHappening(happeningTypeOdOrder: string) {
      if (happeningTypeOdOrder === 'createdDatetime') {
        this.visibleHappenings.sort(this.happeningService.compSortByDateAsc);
      } else {
        this.visibleHappenings.sort(this.happeningService.compSortByNameAsc);
      }
  }
}



