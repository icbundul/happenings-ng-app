import { Injectable } from '@angular/core';
import { User} from '../domain/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User;

  constructor() { }

  loginUser(userName: string, password: string) {

    // TODO: ADD SERVER RESPONSE HERE
    this.currentUser = {
      id: 1,
      userName: userName,
      firstName: 'John',
      lastName: 'Papa'
    };
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
  }
}
