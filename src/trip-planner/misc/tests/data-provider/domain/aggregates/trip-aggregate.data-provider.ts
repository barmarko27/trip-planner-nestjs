import {
  TripAggregateRoot,
  TripCostValueObject,
  TripDurationValueObject,
  TripIdValueObject,
  TripTypeEnum,
  TripTypeValueObject,
} from '@trip-planner/domain';
import { CityEntityDataProvider, TripInfoDataProvider } from '../entities';
import { faker } from '@faker-js/faker';

/**
 * TripAggregateDataProvider class.
 * @description Data Provider for TripAggregateRoot.
 */
export class TripAggregateDataProvider {
  /**
   * Generate a TripAggregateRoot instance with random data
   */
  static generate() {
    const uuid = TripIdValueObject.generate();
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
    return TripAggregateRoot.create({
      origin,
      destination,
      duration,
      type,
      cost,
      info,
      uuid,
    });
  }
}
