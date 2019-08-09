import { Component, OnInit, Input } from '@angular/core';
import { Happening } from '../domain/Happening';
import { HappeningService } from '../services/happening.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-happening-detail',
  templateUrl: './happening-detail.component.html',
  styleUrls: ['./happening-detail.component.css']
})
export class HappeningDetailComponent implements OnInit {

  @Input() happening: Happening;

  constructor(private route: ActivatedRoute,
              private happeningService: HappeningService,
              private location: Location) { }

  ngOnInit() {
    this.getHappening();
  }

  getHappening(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.happeningService.getHappening(id).subscribe(happening => this.happening = happening);
  }

  goBack(): void {
     this.location.back();
  }

}
