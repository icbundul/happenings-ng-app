import {BaseEntity} from './BaseEntity';
import {HappeningType} from './happening-type';

export class Happening extends BaseEntity {

  name: string;

  dateFrom: Date;

  dateTo: Date;

  text: string;

  textHr: string;

  happeningType?: HappeningType;
}
