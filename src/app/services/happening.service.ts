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
  private HAPPENINGS_URL     = `${this.BASE_URL}/happenings/`;

  constructor(private http: HttpClient,
              private messageService: MessageService) {
    super(http, messageService);
  }

  getHappenings(): Observable<Happening[]> {

    const urlGetAll = 'http://localhost:8080/api/happenings/all';

    return this.http.get<Happening[]>(this.ALL_HAPPENINGS_URL)
      .pipe(
        tap(_ => this.log('fetched happenings')),
        catchError(this.handleError<Happening[]>('getHeroes', []))
      );

  }

  getHappening(id: number): Observable<Happening> {

    const urlGetById = `${this.HAPPENINGS_URL}${id}`;
    return this.http.get<Happening>(urlGetById).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Happening>(`getHero id=${id}`))
    );
  }

  /** PUT: update the happening on the server */
  updateHappening (happening: Happening): Observable<any> {
    return this.http.put(this.HAPPENINGS_URL, happening, this.httpOptions).pipe(
      tap(_ => this.log(`updated happening id=${happening.id}`)),
      catchError(this.handleError<any>('updateHappening'))
    );
  }

  /** POST: add a new happening to the server */
  addHappening (happening: Happening): Observable<Happening> {
    return this.http.post<Happening>(this.HAPPENINGS_URL, happening, this.httpOptions).pipe(
      tap((newHappening: Happening) => this.log(`added happening w/ id=${newHappening.id}`)),
      catchError(this.handleError<Happening>('addHappening'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHappening (happening: Happening | number): Observable<Happening> {
    const id = typeof happening === 'number' ? happening : happening.id;
    const urlGetById = `${this.HAPPENINGS_URL}/${id}`;

    return this.http.delete<Happening>(urlGetById, this.httpOptions).pipe(
      tap(_ => this.log(`deleted happening id=${id}`)),
      catchError(this.handleError<Happening>('deleteHappening'))
    );
  }
}
