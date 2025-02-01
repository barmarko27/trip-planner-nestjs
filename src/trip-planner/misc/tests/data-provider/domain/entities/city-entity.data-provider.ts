import {
  CityEntity,
  CityNameValueObject,
  GeoValueObject,
} from '@trip-planner/domain';
import { IataValueObjectDataProvider } from '../value-objects';
import { faker } from '@faker-js/faker';

/**
 * @description Data provider for CityEntity
 */
export class CityEntityDataProvider {
  /**
   * @description Generate a new CityEntity with random data
   */
  static generate() {
    return CityEntity.create({
      iataCode: IataValueObjectDataProvider.generate(),
      name: CityNameValueObject.create(faker.location.city()),
      geo: GeoValueObject.create({
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      }),
    });
  }
}
