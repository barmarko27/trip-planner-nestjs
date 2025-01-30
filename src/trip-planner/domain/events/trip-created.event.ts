import { DomainEvent } from '@shared/domain';
import { NewTripAggregateRoot } from '../aggregates';

export class TripCreatedEvent implements DomainEvent {
  public dateTimeOccurred: Date;

  constructor(public readonly aggregate: NewTripAggregateRoot) {
    this.dateTimeOccurred = new Date();
  }
}
