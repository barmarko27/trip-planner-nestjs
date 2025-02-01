import { DomainEvent } from '@shared/domain';
import { TripAggregateRoot } from '../aggregates';

export class TripLoadedEvent implements DomainEvent {
  public dateTimeOccurred: Date;

  constructor(public readonly aggregate: TripAggregateRoot) {
    this.dateTimeOccurred = new Date();
  }
}
