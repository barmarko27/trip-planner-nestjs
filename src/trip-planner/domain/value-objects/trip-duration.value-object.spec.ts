import { TripDurationException } from '../exception/trip-duration.exception';
import { TripDurationValueObject } from '@trip-planner/domain';

describe('TripDurationValueObject', () => {
  test('should create a trip duration value object', () => {
    const duration = 2;
    const tripDurationValueObject = TripDurationValueObject.create(duration);

    expect(tripDurationValueObject.inHours()).toEqual(duration);
  });

  test('should create a trip duration value object and return duration in minutes', () => {
    const duration = 5;
    const tripDurationValueObject = TripDurationValueObject.create(duration);

    expect(tripDurationValueObject.inMinutes()).toEqual(duration * 60);
  });

  test('should create a trip duration value object and return duration in seconds', () => {
    const duration = 8;
    const tripDurationValueObject = TripDurationValueObject.create(duration);

    expect(tripDurationValueObject.inSeconds()).toEqual(duration * 3600);
  });

  test('should throw an error if the trip duration is invalid', () => {
    expect(() => TripDurationValueObject.create(-1)).toThrow(
      TripDurationException,
    );
  });
});
