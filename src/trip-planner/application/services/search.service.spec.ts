import { SearchService } from './search.service';
import { TripAggregateRoot, TripRepository } from '@trip-planner/domain';
import { SortTripByEnum } from '../constants/enum';
import { FromDomainAdapter } from '../adapters/trip/from-domain.adapter';
import { TripsDto } from '../dtos/trips.dto';
import { RequestDto } from '../dtos/search';
import { randomIataCode, TripAggregateDataProvider } from '@trip-planner/misc';
import { faker } from '@faker-js/faker';

const transformTripAggregateToDto = (trip: TripAggregateRoot) => {
  return FromDomainAdapter.adapt(trip);
};

describe('SearchTripService', () => {
  let findTripService: SearchService;
  let tripRepository: TripRepository;
  let trips: TripAggregateRoot[];
  let results: TripsDto[];

  beforeEach(() => {
    trips = Array.from({ length: 10 }).map(TripAggregateDataProvider.generate);
    results = trips.map(transformTripAggregateToDto);
    tripRepository = {
      search: jest.fn().mockResolvedValue(trips),
    } as any;

    findTripService = new SearchService(tripRepository);
  });

  test('should search trips', async () => {
    const tripDto = new RequestDto();
    tripDto.destination = randomIataCode();
    tripDto.origin = randomIataCode();
    tripDto.sort = faker.helpers.enumValue(SortTripByEnum);
    const foundTrip = await findTripService.execute(tripDto);
    expect(foundTrip).toStrictEqual(results);
    expect(foundTrip).toHaveLength(trips.length);
  });
});
