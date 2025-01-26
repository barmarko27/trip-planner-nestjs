import { AggregateRoot } from '../aggregates';

export interface DomainEvent {
  dateTimeOccurred: Date;
  aggregate: AggregateRoot<unknown>;
}
