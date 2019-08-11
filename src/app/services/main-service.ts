import {MessageService} from './messages.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';

export abstract class MainService {

  protected BASE_URL = window['cfgApiBaseUrl'] + '/api';
  private mHttp: HttpClient;
  private mMessageService: MessageService;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private backendUrl = '';

  constructor(http: HttpClient, messageService: MessageService) {
    this.mMessageService = messageService;
    this.mHttp = http;
  }

  log(message: String): void {
    this.mMessageService.add(this.constructor.name + `: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  protected handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
