import { CityIdValueObject } from '@trip-planner/domain';
import { randomUUID } from 'crypto';
import { CityIdException } from '../exception/city-id.exception';

describe('CityIdValueObject', () => {
  test('should create a city id value object', () => {
    const cityId = randomUUID();
    const cityIdValueObject = CityIdValueObject.create(cityId);

    expect(cityIdValueObject.value).toEqual(cityId);
  });

  test('should throw an error if the city id is invalid', () => {
    expect(() => CityIdValueObject.create('')).toThrow(CityIdException);
  });
});
