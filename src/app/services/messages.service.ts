import { Injectable } from '@angular/core';
import DateTimeFormat = Intl.DateTimeFormat;

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(new Date().toLocaleString() + ' - ' + message);
  }

  clear() {
    this.messages = [];
  }
}
