import {Inject, Injectable} from '@angular/core';
import { MainService } from './main-service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './messages.service';
import { HappeningPlace } from '../domain/HappeningPlace';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Toastr, TOASTR_TOKEN} from './toastr.service';

@Injectable({
  providedIn: 'root'
})
export class HappeningPlaceService extends MainService {

  private HAPPENING_PLACES_URL = `${this.BASE_URL}/happeningplaces/`;
  private HAPPENING_PLACE_DELETE_URL = `${this.HAPPENING_PLACES_URL}/delete/`;
  private HAPPENING_PLACE_BYID_URL = `${this.BASE_URL}/happeningplaces/`;

  constructor(private http: HttpClient,
              private messageService: MessageService,
              @Inject(TOASTR_TOKEN) private toastr: Toastr) {
    super(http, messageService, toastr);
  }

  getHappeningPlacesByHappeningId(happeningId: number): Observable<HappeningPlace[]> {

    const urlGetByHappeningId = `${this.HAPPENING_PLACES_URL}${happeningId}`;

    return this.http.get<HappeningPlace[]>(urlGetByHappeningId).pipe(
      tap(_ => this.log(`fetched happeningId id=${happeningId}`)),
      catchError(this.handleError<HappeningPlace[]>(`getHappeningPlacesByHappeningId id=${happeningId}`))
    );
  }

  /** DELETE: delete the happeningPlace from the server */
  deleteHappeningPlace (happeningPlace: HappeningPlace | number): Observable<HappeningPlace> {

    const id = typeof happeningPlace === 'number' ? happeningPlace : happeningPlace.id;
    const urlDeleteById = `${this.HAPPENING_PLACE_DELETE_URL}${id}`;

    return this.http.delete<HappeningPlace>(urlDeleteById, this.httpOptions).pipe(
      tap(_ => this.log(`deleted HappeningPlace id=${id}`)),
      catchError(this.handleError<HappeningPlace>('deleteHappeningPlce'))
    );
  }

  /** POST: add a new happeningPlace to the server */
  addHappeningPlace (happeningPlace: HappeningPlace): Observable<HappeningPlace> {
    return this.http.post<HappeningPlace>(this.HAPPENING_PLACES_URL, happeningPlace, this.httpOptions).pipe(
      tap((newHappeningPlace: HappeningPlace) => this.log(`added happeningPlace w/ id=${newHappeningPlace.id}, happening id ${newHappeningPlace.happening.id}`)),
      catchError(this.handleError<HappeningPlace>('addHappeningPlace'))
    );
  }

  getHappeningPlaceById(id: number): Observable<HappeningPlace> {

    return this.http.get<HappeningPlace>(`${this.HAPPENING_PLACE_BYID_URL}${id}`).pipe(
      tap(_ => this.log(`fetched happeningPlace id=${id}`)),
      catchError(this.handleError<HappeningPlace>(`getHappeningPlaceByid ${id}`))
    );
  }

  searchHappeningPlaces(searchTerm: string): Observable<HappeningPlace[]> {

    if (!searchTerm.trim()) {
      // if not search term, return empty happening array.
      return of([]);
    }
    const urlBySearchTerm = `${this.HAPPENING_PLACES_URL}search?searchTerm=${searchTerm}`;

    return this.http.get<HappeningPlace[]>(urlBySearchTerm).pipe(
      tap(_ => this.log(`found happening places matching "${urlBySearchTerm}"`)),
      catchError(this.handleError<HappeningPlace[]>('searchHappeningPlaces', []))
    );
  }

}
