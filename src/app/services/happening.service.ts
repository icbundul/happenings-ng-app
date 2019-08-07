import { Injectable } from '@angular/core';
import { Happening } from '../domain/Happening';
import { HAPPENINGS } from '../mock-happenings';
import { Observable, of } from 'rxjs';
import { MessageService } from './messages.service';

@Injectable({
  providedIn: 'root'
})

export class HappeningService {

  constructor(private messageService: MessageService) { }

  getHappenings(): Observable<Happening[]> {
    this.messageService.add(this.constructor.name + ': fetched happenings');
    return of(HAPPENINGS);
  }
}
