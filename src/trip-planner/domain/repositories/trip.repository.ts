import { TripAggregateRoot } from '../aggregates';
import { SearchTripBuilder } from './builder/search-trip.builder';

export interface TripRepository {
  search(criteria: SearchTripBuilder): Promise<TripAggregateRoot[]>;
}
