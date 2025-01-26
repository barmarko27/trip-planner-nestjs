import {
  CityEntity,
  TripAggregateRoot,
  TripCostValueObject,
  TripDurationValueObject,
  TripInfoEntity,
  TripTypeValueObject,
} from '@trip-planner/domain';
import { TripAggregateDataProvider } from '@trip-planner/misc';

describe('TripAggregateRoot', () => {
  test('should create a trip aggregate root', () => {
    const tripAggregateRoot = TripAggregateDataProvider.generate();

    expect(tripAggregateRoot).toBeInstanceOf(TripAggregateRoot);
    expect(tripAggregateRoot.origin).toBeInstanceOf(CityEntity);
    expect(tripAggregateRoot.destination).toBeInstanceOf(CityEntity);
    expect(tripAggregateRoot.info).toBeInstanceOf(TripInfoEntity);
    expect(tripAggregateRoot.cost).toBeInstanceOf(TripCostValueObject);
    expect(tripAggregateRoot.duration).toBeInstanceOf(TripDurationValueObject);
    expect(tripAggregateRoot.type).toBeInstanceOf(TripTypeValueObject);
  });
});
