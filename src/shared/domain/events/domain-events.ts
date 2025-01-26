import { DomainEvent } from './domain.event';
import { AggregateRoot } from '../aggregates';
import { UUIDValueObject } from '../value-objects';

export class DomainEvents {
  private static handlersMap: { [key: string]: Array<any> } = {};
  private static markedAggregates: AggregateRoot<any>[] = [];

  public static markAggregateForDispatch<T>(aggregate: AggregateRoot<T>): void {
    const aggregateFound = !!this.findMarkedAggregateByID(
      aggregate.getAggregateId(),
    );

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }

  private static dispatchAggregateEvents<T>(aggregate: AggregateRoot<T>): void {
    aggregate.domainEvents.forEach((event: DomainEvent) =>
      this.dispatch(event),
    );
  }

  private static removeAggregateFromMarkedDispatchList<T>(
    aggregate: AggregateRoot<T>,
  ): void {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));
    this.markedAggregates.splice(index, 1);
  }

  private static findMarkedAggregateByID<T>(
    id: UUIDValueObject,
  ): AggregateRoot<T> | null {
    let found: AggregateRoot<T> | null = null;
    for (const aggregate of this.markedAggregates) {
      if (aggregate.getAggregateId().equals(id)) {
        found = aggregate;
      }
    }
    return found;
  }

  public static dispatchEventsForAggregate(id: UUIDValueObject): void {
    const aggregate = this.findMarkedAggregateByID(id);
    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  public static register(
    callback: (event: DomainEvent) => void,
    eventClassName: string,
  ): void {
    if (
      !Object.prototype.hasOwnProperty.call(this.handlersMap, eventClassName)
    ) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(callback);
  }

  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  public static clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }

  private static dispatch(event: DomainEvent): void {
    const eventClassName: string = event.constructor.name;

    if (
      Object.prototype.hasOwnProperty.call(this.handlersMap, eventClassName)
    ) {
      const handlers: any[] = this.handlersMap[eventClassName];
      for (const handler of handlers) {
        handler(event);
      }
    }
  }
}
