import { CityEntity, SearchTripAggregateRoot } from '@trip-planner/domain';
import { CityEntityDataProvider } from '@trip-planner/misc';
import { SameRouteException } from '../exception/same-route.exception';

describe('SearchTripAggregateRoot', () => {
  test('should create a search trip aggregate root', () => {
    const origin = CityEntityDataProvider.generate();
    const destination = CityEntityDataProvider.generate();

    const trips = SearchTripAggregateRoot.create({
      origin,
      destination,
    });

    expect(trips.destination).toBeInstanceOf(CityEntity);
    expect(trips.origin).toBeInstanceOf(CityEntity);
  });

  test('should throw an error if the origin is the same as the destination', () => {
    const origin = CityEntityDataProvider.generate();
    const destination = origin;
    expect(() =>
      SearchTripAggregateRoot.create({ origin, destination }),
    ).toThrowError(SameRouteException);
  });
});
