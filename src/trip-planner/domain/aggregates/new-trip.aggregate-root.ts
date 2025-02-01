import { AggregateRoot } from '@shared/domain';
import { Trip } from './trip';
import { TripCreatedEvent } from '../events';
import {
  TripCostValueObject,
  TripDurationValueObject,
  TripTypeValueObject,
} from '../value-objects';
import { CityEntity, TripInfoEntity } from '../entities';

export type NewTripAggregateRootProps = Omit<Trip, 'uuid'>;

export class NewTripAggregateRoot extends AggregateRoot<NewTripAggregateRootProps> {
  private constructor(props: NewTripAggregateRootProps) {
    super(props);
  }

  /**
   * Create a new TripAggregateRoot
   * @param props
   */
  static create(props: NewTripAggregateRootProps): NewTripAggregateRoot {
    const trip = new NewTripAggregateRoot(props);
    trip.addDomainEvent(new TripCreatedEvent(trip));
    return trip;
  }

  get origin(): CityEntity {
    return this.props.origin;
  }

  get destination(): CityEntity {
    return this.props.destination;
  }

  get duration(): TripDurationValueObject {
    return this.props.duration;
  }

  get cost(): TripCostValueObject {
    return this.props.cost;
  }

  get type(): TripTypeValueObject {
    return this.props.type;
  }

  get info(): TripInfoEntity {
    return this.props.info;
  }
}
