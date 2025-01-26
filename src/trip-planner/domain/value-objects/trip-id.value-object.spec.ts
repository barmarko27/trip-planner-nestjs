import { TripIdValueObject } from '@trip-planner/domain';
import { TripIdException } from '../exception/trip-id.exception';
import { randomUUID } from 'crypto';

describe('TripIdValueObject', () => {
  test('should create a trip id value object', () => {
    const tripId = randomUUID();
    const tripIdValueObject = TripIdValueObject.create(tripId);

    expect(tripIdValueObject.value).toEqual(tripId);
  });

  test('should throw an error if the trip id is invalid', () => {
    expect(() => TripIdValueObject.create('')).toThrow(TripIdException);
  });
});
