import {BaseEntity} from './BaseEntity';

export class Happening extends BaseEntity {

  name: string;

  dateFrom: Date;

  dateTo: Date;

  text: string;

  textHr: string;

  happeningType?: number;
}
