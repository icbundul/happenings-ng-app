import {Directive, ElementRef, Inject, OnInit, Input} from '@angular/core';
import {JQ_TOKEN} from '../services';

@Directive({
  selector: '[appModalTrigger]'
})
export class ModalTriggerDirective implements OnInit {

  private el: HTMLElement;
  @Input() modalName: string;

  constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $: any) {
    this.el = ref.nativeElement;
  }

  ngOnInit(): void {

    this.el.addEventListener('click', e => {
      this.$(`#${this.modalName}`).modal({});
    });

  }
}
