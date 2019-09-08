import { Injectable } from '@angular/core';
import { Happening } from '../domain/Happening';
import { Observable, of } from 'rxjs';
import { MessageService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MainService } from './main-service';
import { catchError, map, tap } from 'rxjs/operators';
import {ToastrService} from './toastr.service';
import {HappeningType} from '../domain/happening-type';
import {getTime} from '../shared';

@Injectable({
  providedIn: 'root'
})

export class HappeningService extends MainService {

  private ALL_HAPPENINGS_URL = `${this.BASE_URL}/happenings/all`;
  private HAPPENINGS_URL     = `${this.BASE_URL}/happenings/`;
  private ALL_HAPPENINGTYPES_URL = `${this.BASE_URL}/happenings/allHappeningTypes/`;

  constructor(private http: HttpClient,
              private messageService: MessageService,
              private toastrService: ToastrService) {
    super(http, messageService, toastrService);
  }

  getHappenings(): Observable<Happening[]> {

    return this.http.get<Happening[]>(this.ALL_HAPPENINGS_URL)
      .pipe(
        tap(_ => this.log('fetched happenings')),
        catchError(this.handleError<Happening[]>('getHappenings', []))
      );
  }

  getHappeningTypes(): Observable<HappeningType[]> {

    return this.http.get<HappeningType[]>(this.ALL_HAPPENINGTYPES_URL)
      .pipe(
        tap(_ => this.log('fetched all happening types')),
      catchError(this.handleError<HappeningType[]>('getHappeningTypes', []))
    );
  }

  getHappening(id: number): Observable<Happening> {

    const urlGetById = `${this.HAPPENINGS_URL}${id}`;

    return this.http.get<Happening>(urlGetById).pipe(
      tap(_ => this.log(`fetched happening id=${id}`)),
      catchError(this.handleError<Happening>(`getHappening id=${id}`))
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

  /** DELETE: delete the happening from the server */
  deleteHappening (happening: Happening | number): Observable<Happening> {
    const id = typeof happening === 'number' ? happening : happening.id;
    const urlGetById = `${this.HAPPENINGS_URL}/${id}`;

    return this.http.delete<Happening>(urlGetById, this.httpOptions).pipe(
      tap(_ => this.log(`deleted happening id=${id}`)),
      catchError(this.handleError<Happening>('deleteHappening'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHappenings(term: string): Observable<Happening[]> {
    if (!term.trim()) {
      // if not search term, return empty happening array.
      return of([]);
    }
    const urlByName = `${this.HAPPENINGS_URL}search?name=${term}`;

    return this.http.get<Happening[]>(urlByName).pipe(
      tap(_ => this.log(`found happening matching "${term}"`)),
      catchError(this.handleError<Happening[]>('searchHappenings', []))
    );
  }

  compSortByDateAsc (h1: Happening, h2: Happening) {
     return getTime(h1.createdDatetime) - getTime(h2.createdDatetime);
  }

  compSortByNameAsc(h1: Happening, h2: Happening) {
    if (h1.name > h2.name) {
      return 1;
    } else if (h1.name === h2.name) {
      return 0;
    } else {
      return -1;
    }
  }
}
