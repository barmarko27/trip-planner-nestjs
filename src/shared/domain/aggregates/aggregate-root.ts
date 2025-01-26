import { UUIDValueObject } from '../value-objects';
import { Entity } from '../entities';
import { DomainEvent, DomainEvents } from '../events';

export interface AggregateRootProps {
  getAggregateId(): UUIDValueObject;
}

export abstract class AggregateRoot<T>
  extends Entity<T>
  implements AggregateRootProps
{
  private _domainEvents: DomainEvent[] = [];

  protected constructor(props: T) {
    super(props, UUIDValueObject.generate());
  }

  /**
   * Get the aggregate id
   */
  getAggregateId(): UUIDValueObject {
    return this._uuid;
  }

  /**
   * Clear all domain events
   */
  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  /**
   * Get the domain events
   */
  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  /**
   * Add a domain event to the aggregate
   * @param domainEvent
   * @protected
   */
  protected addDomainEvent(domainEvent: DomainEvent): void {
    // Add the domain event to this aggregate's list of domain events
    this._domainEvents.push(domainEvent);
    // Add this aggregate instance to the domain event's list of aggregates who's
    // events it eventually needs to dispatch.
    DomainEvents.markAggregateForDispatch(this);
    // Log the domain event
    this.logDomainEventAdded(domainEvent);
  }

  /**
   * Log the domain event added
   * @param domainEvent
   * @private
   */
  private logDomainEventAdded(domainEvent: DomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    console.log(
      `[Domain Event Created]: ${thisClass?.constructor.name} ==> ${domainEventClass?.constructor.name}`,
    );
  }
}
