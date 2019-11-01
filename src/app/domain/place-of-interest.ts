import {BaseEntity} from './BaseEntity';
import {PlaceOfInterestType} from './place-of-interest-type';
import {HappeningPlace} from './HappeningPlace';

export class PlaceOfInterest extends BaseEntity {

  name: string;

  locationX: number;

  locationY: number;

  placeOfInterestType?: PlaceOfInterestType;

  orderNumber?: number;

  happeningPlace?: HappeningPlace;

  happeningPlaceId?: number;
}
