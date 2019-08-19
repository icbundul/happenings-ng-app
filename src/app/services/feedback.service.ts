import { Injectable } from '@angular/core';
import {MainService} from './main-service';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './messages.service';
import {ToastrService} from './toastr.service';
import {FeedbackViewModel} from '../domain/feedback-view-model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends MainService {

  private FEEDBACK_URL = `${this.BASE_URL}/feedback`;

  model: FeedbackViewModel = {
    name: '',
    email: '',
    feedback: ''
  };

  constructor(private http: HttpClient,
              private messageService: MessageService,
              private toastrService: ToastrService) {

    super(http, messageService, toastrService);
  }

  onInit() {
    this.toastrService.info('Feedback');
    this.messageService.add(this.constructor.name + ': init feedback!');
  }

  sendFeedback(): void {
    this.http.post(this.FEEDBACK_URL, this.model).subscribe(
      res => {
        location.reload();
      },
      err => {
        this.toastrService.error('Error has occured while sending feedback');
      }
    );
    this.toastrService.success('Feedback send!');
    this.messageService.add(this.constructor.name + ': feedback send!');
  }

}



