import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../services/messages.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  model: FeedbackViewModel = {
    name: '',
    email: '',
    feedback: ''
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.add(this.constructor.name + ': init feedback!');
  }

  sendFeedback(): void {
    let url = 'http://localhost:8080/api/feedback';
    this.http.post(url, this.model).subscribe(
      res=>{
        location.reload();
      },
      err => {
        alert('Error has occured while sending feedback');
      }
    );
    this.messageService.add(this.constructor.name + ': feedback send!');
  }
}

export interface FeedbackViewModel {
  name:string;
  email:string;
  feedback:string;
}
