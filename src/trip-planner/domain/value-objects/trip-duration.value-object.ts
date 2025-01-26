import { TinyTypeOf } from 'tiny-types';
import { TripDurationException } from '../exception/trip-duration.exception';

export class TripDurationValueObject extends TinyTypeOf<number>() {
  private constructor(value: number) {
    super(value);
  }
  /**
   * Create a new TripIdValueObject
   * @param value
   */
  public static create(value: number): TripDurationValueObject {
    if (value < 0) {
      throw new TripDurationException('Duration cannot be negative.');
    }
    return new TripDurationValueObject(value);
  }

  /**
   * Returns the duration in hours.
   */
  public inHours(): number {
    return this.value;
  }

  /**
   * Returns the duration in minutes.
   */
  public inMinutes(): number {
    return this.value * 60;
  }

  /**
   * Returns the duration in seconds.
   */
  public inSeconds(): number {
    return this.value * 3600;
  }
}
