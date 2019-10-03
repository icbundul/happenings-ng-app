import {BaseEntity} from './BaseEntity';
import {Happening} from './Happening';

export class HappeningPlace extends BaseEntity {

  placeName: string;

  address: string;

  locationX: number;

  locationY: number;

  dateFrom: Date;

  dateTo: Date;

  orderNumber?: number;

  happening?: Happening;

  happeningId?: number;
}
