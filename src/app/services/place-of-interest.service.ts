import {Inject, Injectable} from '@angular/core';
import {PlaceOfInterest} from '../domain/place-of-interest';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from './messages.service';
import {Toastr, TOASTR_TOKEN} from './toastr.service';
import {MainService} from './main-service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaceOfInterestService extends MainService {

  constructor(private http: HttpClient,
              private messageService: MessageService,
              @Inject(TOASTR_TOKEN) private toastr: Toastr) {
    super(http, messageService, toastr);
  }

  getAllPlaceOfInterests(): Observable<PlaceOfInterest[]> {

    return this.http.get<PlaceOfInterest[]>(this.ALL_PLACE_OF_INTERESTS_URL)
      .pipe(catchError(this.handleError<PlaceOfInterest[]>('getAllPlaceOfInterests', [])));

  }

  getPlaceOfInterest(id: number): Observable<PlaceOfInterest> {
    return this.http.get<PlaceOfInterest>(this.PLACE_OF_INTEREST_URL + id)
      .pipe(catchError(this.handleError<PlaceOfInterest>('getPlaceOfInterest')));
  }

  savePlaceOfInterest(placeOfInterest: PlaceOfInterest): Observable<PlaceOfInterest[]> {
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post<PlaceOfInterest[]>(this.PLACE_OF_INTEREST_URL, event, options);
  }

  searchPlaceOfInterests(searchTerm: string) {
    return this.http.get<PlaceOfInterest>(`${this.PLACE_OF_INTEREST_URL}search?search=${searchTerm}`)
      .pipe(catchError(this.handleError<PlaceOfInterest>('searchPlaceOfInterests')));
  }

  deletePlaceOfInterest(placeOfInterest: PlaceOfInterest | number)  {
    const id = typeof placeOfInterest === 'number' ? placeOfInterest : placeOfInterest.id;

    const deleteUrl = `${this.PLACE_OF_INTEREST_URL}delete/${id}`;

    this.http.delete(deleteUrl)
      .pipe(catchError(this.handleError('deletePlaceOfInterest')))
      .subscribe();
  }
}
