import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../services/messages.service';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(private http: HttpClient, private messageService: MessageService, private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.feedbackService.onInit();
  }

  sendFeedback(): void {
    this.feedbackService.sendFeedback();
  }
}
