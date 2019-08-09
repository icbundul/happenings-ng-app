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

  getHappening(id: number): Observable<Happening> {
    // TODO: send the message _after_ fetching the happening
    this.messageService.add(this.constructor.name + `: fetched ha id=${id}`);
    return of(HAPPENINGS.find(hero => hero.id === id));
  }
}
