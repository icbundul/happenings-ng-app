import {MessageService} from './messages.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {ToastrService} from './toastr.service';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

export abstract class MainService {

  protected BASE_URL = window['cfgApiBaseUrl'] + '/api';
  private mHttp: HttpClient;
  private mMessageService: MessageService;
  private mToastrService: ToastrService;

  @Injectable()
  private router: Router;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private backendUrl = '';

  constructor(http: HttpClient, messageService: MessageService, toastrService: ToastrService) {

    this.mMessageService = messageService;
    this.mHttp = http;
    this.mToastrService = toastrService;
  }

  log(message: String): void {
    this.mToastrService.info(message.toString());
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

      this.mToastrService.error(error.message, operation);
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  redirectNotFound(): void {
    this.router.navigate(['**']);
  }

}
