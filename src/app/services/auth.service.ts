import { Injectable } from '@angular/core';
import { User} from '../domain/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User;

  constructor(private http: HttpClient) { }

  loginUser(userName: string, password: string) {

    const loginInfo = { username: userName, password: password};
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

    return this.http.post('/api/login', loginInfo, options)
      .pipe(tap(data => {
        this.currentUser = <User>data['user'];
      }))
      .pipe(catchError(err => {
        return of(false);
      }));

    // TODO: ADD SERVER RESPONSE HERE
    /*this.currentUser = {
      id: 1,
      userName: userName,
      firstName: 'John',
      lastName: 'Papa'
    };*/
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  checkAuthenticationStatus() {

    return this.http.get('api/currentIdentity')
      .pipe(tap(data => {
        if (data instanceof Object) {
          this.currentUser = <User>data;
        }
      }));
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
  }
}
