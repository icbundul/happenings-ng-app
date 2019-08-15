import { Injectable } from '@angular/core';
import { MainService } from './main-service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './messages.service';
import { HappeningPlace } from '../domain/HappeningPlace';
import { Observable } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Happening} from '../domain/Happening';

@Injectable({
  providedIn: 'root'
})
export class HappeningPlaceService extends MainService {

  private HAPPENING_PLACES_URL = `${this.BASE_URL}/happeningplaces/`;
  private HAPPENING_PLACE_DELETE_URL = `${this.HAPPENING_PLACES_URL}/delete/`;

  constructor(private http: HttpClient,
              private messageService: MessageService) {
    super(http, messageService);
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

}
