import { DomainEvent } from '@shared/domain';
import { TripAggregateRoot } from '../aggregates/trip.aggregate-root';

export class TripCreatedEvent implements DomainEvent {
  public dateTimeOccurred: Date;

  constructor(public readonly aggregate: TripAggregateRoot) {
    this.dateTimeOccurred = new Date();
  }
}
