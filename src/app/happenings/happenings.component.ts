import { Component, OnInit } from '@angular/core';
import { Happening } from '../domain/Happening';
import { HappeningService } from '../services/happening.service';

@Component({
  selector: 'app-happenings',
  templateUrl: './happenings.component.html',
  styleUrls: ['./happenings.component.css']
})
export class HappeningsComponent implements OnInit {

  happenings: Happening[];

  /*selectedHappening: Happening;*/

  constructor(private happeningService: HappeningService) { }

  ngOnInit() {
    this.getHappenings();
  }

/*  onSelect(happening: Happening) {
    this.selectedHappening = happening;
  }*/

  getHappenings(): void {
    this.happeningService.getHappenings()
      .subscribe(happenings => this.happenings = happenings);
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
    this.happenings = this.happenings.filter(h => h !== happening);
    this.happeningService.deleteHappening(happening).subscribe();
  }

}
