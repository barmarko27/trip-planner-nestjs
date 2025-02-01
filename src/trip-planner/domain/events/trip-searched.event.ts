import { DomainEvent } from '@shared/domain';
import { SearchTripAggregateRoot } from '../aggregates/search-trip.aggregate-root';

export class TripSearchedEvent implements DomainEvent {
  public dateTimeOccurred: Date;

  constructor(public readonly aggregate: SearchTripAggregateRoot) {
    this.dateTimeOccurred = new Date();
  }
}
