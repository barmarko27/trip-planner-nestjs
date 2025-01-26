import { GeoValueObject } from './geo.value-object';
import { faker } from '@faker-js/faker';

describe('GeoValueObject', () => {
  test('should create a valid GeoValueObject instance', () => {
    const latitude = faker.location.latitude();
    const longitude = faker.location.longitude();
    const geo = GeoValueObject.create({ latitude, longitude });
    expect(geo.latitude).toEqual(latitude);
    expect(geo.longitude).toEqual(longitude);
  });
});
