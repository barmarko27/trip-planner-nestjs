import {
  NewTripAggregateRoot,
  TripCostValueObject,
  TripDurationValueObject,
  TripTypeEnum,
  TripTypeValueObject,
} from '@trip-planner/domain';
import { CityEntityDataProvider, TripInfoDataProvider } from '../entities';
import { faker } from '@faker-js/faker';

/**
 * NewTripAggregateDataProvider class.
 * @description Data Provider for NewTripAggregateData.
 */
export class NewTripAggregateDataProvider {
  /**
   * Generate a NewTripAggregateRoot instance with random data
   */
  static generate() {
    const origin = CityEntityDataProvider.generate();
    const destination = CityEntityDataProvider.generate();
    const duration = TripDurationValueObject.create(
      faker.number.int({ min: 1, max: 24 }),
    );
    const type = TripTypeValueObject.create(
      faker.helpers.enumValue(TripTypeEnum),
    );
    const cost = TripCostValueObject.create({
      amount: faker.number.int({ min: 30, max: 3000 }),
    });
    const info = TripInfoDataProvider.generate();
    return NewTripAggregateRoot.create({
      origin,
      destination,
      duration,
      type,
      cost,
      info,
    });
  }
}
