import {BaseEntity} from '../domain/BaseEntity';

export class MainComponent {

  edit: boolean;

  constructor() {
    this.edit = false;
  }

  compareFn(be1: BaseEntity, be2: BaseEntity): boolean {
    return be1 && be2 ? be1.id === be2.id : be1 === be2;
  }

  setEdit(value: boolean): void {
    this.edit = value;
  }

}
