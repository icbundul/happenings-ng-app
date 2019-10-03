import {BaseEntity} from './BaseEntity';
import {HappeningType} from './happening-type';
import {HappeningPlace} from './HappeningPlace';

export class Happening extends BaseEntity {

  name: string;

  dateFrom: Date;

  dateTo: Date;

  text: string;

  textHr: string;

  happeningType?: HappeningType;

  happeningPlaces?: HappeningPlace[];
}
