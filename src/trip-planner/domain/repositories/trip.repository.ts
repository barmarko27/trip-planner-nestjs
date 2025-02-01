import { NewTripAggregateRoot, TripAggregateRoot } from '../aggregates';
import { SearchTripBuilder } from './builder/search-trip.builder';
import { TripIdValueObject } from '../value-objects';

export interface TripRepository {
  search(criteria: SearchTripBuilder): Promise<TripAggregateRoot[]>;
  save(trip: NewTripAggregateRoot): Promise<TripAggregateRoot>;
  find(page?: number, limit?: number): Promise<TripAggregateRoot[]>;
  deleteById(tripId: TripIdValueObject): Promise<void>;
}
