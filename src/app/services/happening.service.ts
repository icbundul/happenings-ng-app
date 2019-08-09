import { Injectable } from '@angular/core';
import { Happening } from '../domain/Happening';
import { HAPPENINGS } from '../mock-happenings';
import { Observable, of } from 'rxjs';
import { MessageService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MainService } from './main-service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HappeningService extends MainService {

  private ALL_HAPPENINGS_URL = `${this.BASE_URL}/happenings/all`;
  private BY_ID_HAPPENINGS_URL = `${this.BASE_URL}/happenings/`;

  /* EXAMPLES
  private SEND_FEEDBACK_URL = `${this.BASE_URL}/feedback`;
  private SAVE_UPDATE_NOTEBOOK = `${this.BASE_URL}/notebooks`;
  private DELETE_NOTEBOOK_URL = `${this.BASE_URL}/notebooks/`;
  private ALL_NOTES_URL = `${this.BASE_URL}/notes/all`;
  private NOTES_BY_NOTEBOOK_URL = `${this.BASE_URL}/notes/byNotebook/`;
  private SAVE_UPDATE_NOTE_URL = `${this.BASE_URL}/notes`;
  private DELETE_NOTE_URL = `${this.BASE_URL}/notes/`;*/

  constructor(private http: HttpClient,
              private messageService: MessageService) {
    super(http, messageService);
  }

  getHappenings(): Observable<Happening[]> {
    // dummy data for testing
    // this.messageService.add(this.constructor.name + ': fetched happenings');
    // return of(HAPPENINGS);
    const urlGetAll = 'http://localhost:8080/api/happenings/all';

    return this.http.get<Happening[]>(this.ALL_HAPPENINGS_URL)
      .pipe(
        tap(_ => this.log('fetched happenings')),
        catchError(this.handleError<Happening[]>('getHeroes', []))
      );

  }

  getHappening(id: number): Observable<Happening> {
    /* dummy data for testing
    this.log(`fetched id = ${id}`);
    return of(HAPPENINGS.find(hero => hero.id === id));*/

    const url = `${this.BY_ID_HAPPENINGS_URL}/${id}`;
    return this.http.get<Happening>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Happening>(`getHero id=${id}`))
    );
  }

}
