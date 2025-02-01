import { UUIDValueObject } from '@shared/domain';
import { TripIdException } from '../exception/trip-id.exception';

export class TripIdValueObject extends UUIDValueObject {
  /**
   * Create a new TripIdValueObject
   * @param value
   */
  public static create(value: string): TripIdValueObject {
    if (!TripIdValueObject.isValid(value)) {
      throw new TripIdException('Trip ID is not valid.');
    }
    return new TripIdValueObject(value);
  }
}
