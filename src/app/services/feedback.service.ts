import {Inject, Injectable} from '@angular/core';
import {MainService} from './main-service';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './messages.service';
import {FeedbackViewModel} from '../domain/feedback-view-model';
import {Toastr, TOASTR_TOKEN} from './toastr.service';

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
              @Inject(TOASTR_TOKEN) private toastr: Toastr) {

    super(http, messageService, toastr);
  }

  onInit() {
    this.toastr.info('Feedback');
    this.messageService.add(this.constructor.name + ': init feedback!');
  }

  sendFeedback(): void {
    this.http.post(this.FEEDBACK_URL, this.model).subscribe(
      res => {
        location.reload();
      },
      err => {
        this.toastr.error('Error has occured while sending feedback');
      }
    );
    this.toastr.success('Feedback send!');
    this.messageService.add(this.constructor.name + ': feedback send!');
  }

}



