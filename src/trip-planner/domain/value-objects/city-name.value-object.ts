import { TinyTypeOf } from 'tiny-types';

export class CityNameValueObject extends TinyTypeOf<string>() {
  private constructor(value: string) {
    super(value);
  }
  /**
   * Create a new CityNameValueObject
   * @param value
   */
  public static create(value: string): CityNameValueObject {
    return new CityNameValueObject(value);
  }
}
