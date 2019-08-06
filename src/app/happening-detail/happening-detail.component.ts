import { Component, OnInit, Input } from '@angular/core';
import { Happening } from '../domain/Happening';

@Component({
  selector: 'app-happening-detail',
  templateUrl: './happening-detail.component.html',
  styleUrls: ['./happening-detail.component.css']
})
export class HappeningDetailComponent implements OnInit {

  @Input() happening: Happening;

  constructor() { }

  ngOnInit() {
  }

}
