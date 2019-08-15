import {BaseEntity} from './BaseEntity';
import {Happening} from './Happening';

export class HappeningPlace extends BaseEntity {

  placeName: string;

  adress: string;

  locationX: number;

  locationY: number;

  dateFrom: Date;

  dateTo: Date;

  orderNumber: number;

  happening: Happening;
}
