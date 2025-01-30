import {
  CityEntity,
  NewTripAggregateRoot,
  TripCostValueObject,
  TripDurationValueObject,
  TripInfoEntity,
  TripTypeValueObject,
} from '@trip-planner/domain';
import { NewTripAggregateDataProvider } from '@trip-planner/misc';

describe('TripAggregateRoot', () => {
  test('should create a trip aggregate root', () => {
    const newTripAggregateRoot = NewTripAggregateDataProvider.generate();

    expect(newTripAggregateRoot).toBeInstanceOf(NewTripAggregateRoot);
    expect(newTripAggregateRoot.origin).toBeInstanceOf(CityEntity);
    expect(newTripAggregateRoot.destination).toBeInstanceOf(CityEntity);
    expect(newTripAggregateRoot.info).toBeInstanceOf(TripInfoEntity);
    expect(newTripAggregateRoot.cost).toBeInstanceOf(TripCostValueObject);
    expect(newTripAggregateRoot.duration).toBeInstanceOf(
      TripDurationValueObject,
    );
    expect(newTripAggregateRoot.type).toBeInstanceOf(TripTypeValueObject);
  });
});
