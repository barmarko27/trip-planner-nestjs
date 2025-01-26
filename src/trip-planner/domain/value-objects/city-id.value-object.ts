import { UUIDValueObject } from '@shared/domain';
import { CityIdException } from '../exception/city-id.exception';

export class CityIdValueObject extends UUIDValueObject {
  /**
   * Create a new IataIdValueObject
   * @param value
   */
  public static create(value: string): CityIdValueObject {
    if (!CityIdValueObject.isValid(value)) {
      throw new CityIdException('City ID is not valid.');
    }
    return new CityIdValueObject(value);
  }
}
