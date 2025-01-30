import { TripAggregateRoot, TripRepository } from '@trip-planner/domain';
import { FromDomainAdapter } from '../adapters/trip/from-domain.adapter';
import { TripsDto } from '../dtos/trips.dto';
import { RequestDto } from '../dtos/find/request.dto';
import { TripAggregateDataProvider } from '@trip-planner/misc';
import { FindService } from './find.service';

const transformTripAggregateToDto = (trip: TripAggregateRoot) => {
  return FromDomainAdapter.adapt(trip);
};

describe('FindTripService', () => {
  let findTripService: FindService;
  let tripRepository: TripRepository;
  let trips: TripAggregateRoot[];
  let results: TripsDto[];

  beforeEach(() => {
    trips = Array.from({ length: 10 }).map(TripAggregateDataProvider.generate);
    results = trips.map(transformTripAggregateToDto);
    tripRepository = {
      find: jest.fn().mockResolvedValue(trips),
    } as any;

    findTripService = new FindService(tripRepository);
  });

  test('should find trips', async () => {
    const tripDto = new RequestDto();
    tripDto.page = 1;
    tripDto.limit = 10;
    const foundTrip = await findTripService.execute(tripDto);
    expect(foundTrip).toStrictEqual(results);
    expect(foundTrip).toHaveLength(trips.length);
  });
});
