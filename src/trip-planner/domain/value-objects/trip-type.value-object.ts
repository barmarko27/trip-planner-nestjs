import { TinyTypeOf } from 'tiny-types';
import { TripTypeEnum } from '../constants';

export class TripTypeValueObject extends TinyTypeOf<string>() {
  private constructor(value: string) {
    super(value);
  }
  /**
   * Create a new TripTypeValueObject
   * @param value
   */
  public static create(value: TripTypeEnum): TripTypeValueObject {
    return new TripTypeValueObject(value);
  }
}
