import { Injectable } from '@angular/core';
import { Happening } from '../domain/Happening';
import { HAPPENINGS } from '../mock-happenings';

@Injectable({
  providedIn: 'root'
})

export class HappeningService {

  constructor() { }

  getHappenings(): Happening[] {
    return HAPPENINGS;
  }
}
