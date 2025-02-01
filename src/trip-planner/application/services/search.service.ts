import { Inject, Injectable } from '@nestjs/common';
import { SearchTripBuilder, TripRepository } from '@trip-planner/domain';
import { ToDomainAdapter } from '../adapters/search/to-domain.adapter';
import { FromDomainAdapter } from '../adapters/trip/from-domain.adapter';
import { RequestDto } from '../dtos/search';
import { TripsDto } from '../dtos/trips.dto';

@Injectable()
export class SearchService {
  constructor(
    @Inject('TripRepository') private readonly tripRepository: TripRepository,
  ) {}
  async execute(dto: RequestDto): Promise<TripsDto[]> {
    const searchTripAggregateRoot = ToDomainAdapter.adapt(dto);
    const searchBuilder = new SearchTripBuilder();
    searchBuilder.addCompositeFilter('AND', [
      {
        field: 'origin',
        value: searchTripAggregateRoot.origin.iataCode.value,
        operator: 'EQUAL',
      },
      {
        field: 'destination',
        value: searchTripAggregateRoot.destination.iataCode.value,
        operator: 'EQUAL',
      },
    ]);
    searchBuilder.addSort('fastest' === dto.sort ? 'duration' : 'cost', 'DESC');
    const trips = await this.tripRepository.search(searchBuilder);
    return trips.map((trip) => FromDomainAdapter.adapt(trip));
  }
}
