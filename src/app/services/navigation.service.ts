import {Inject, Injectable, OnDestroy, OnInit} from '@angular/core';
import {MainService} from './main-service';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './messages.service';
import {Toastr, TOASTR_TOKEN} from './toastr.service';
import {HappeningPlaceService} from './happening-place.service';
import {Observable, of} from 'rxjs';
import {HappeningService} from './happening.service';
import {Happening} from '../domain/Happening';
import {HappeningPlace} from '../domain/HappeningPlace';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService extends MainService {

  constructor(private http: HttpClient,
              private messageService: MessageService,
              @Inject(TOASTR_TOKEN) private toastr: Toastr,
              private happeningPlaceService: HappeningPlaceService,
              private happeningService: HappeningService) {
    super(http, messageService, toastr);
  }


  searchHappeningPlaces(searchTerm: string): Observable<HappeningPlace[]> {

    if (!searchTerm.trim()) {
      // if not search term, return empty happening array.
      return of([]);
    }
    const urlBySearchTerm = `${this.HAPPENING_PLACE_URL}search?searchTerm=${searchTerm}`;

    return this.http.get<HappeningPlace[]>(urlBySearchTerm).pipe(
      tap(_ => this.log(`found happening places matching "${urlBySearchTerm}"`)),
      catchError(this.handleError<HappeningPlace[]>('searchHappeningPlaces', []))
    );
  }

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
}
