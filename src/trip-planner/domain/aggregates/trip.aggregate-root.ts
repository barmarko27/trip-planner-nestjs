import { AggregateRoot } from '@shared/domain';
import { Trip } from './trip';
import { TripCreatedEvent } from '../events';
import {
  TripCostValueObject,
  TripDurationValueObject,
  TripIdValueObject,
  TripTypeValueObject,
} from '../value-objects';
import { CityEntity, TripInfoEntity } from '../entities';

export type TripAggregateRootProps = Trip;

export class TripAggregateRoot extends AggregateRoot<TripAggregateRootProps> {
  private constructor(props: TripAggregateRootProps) {
    super(props);
  }

  /**
   * Create a new TripAggregateRoot
   * @param props
   */
  static create(props: TripAggregateRootProps): TripAggregateRoot {
    const trip = new TripAggregateRoot(props);
    if (trip.uuid) {
      trip.addDomainEvent(new TripCreatedEvent(trip));
    }
    return trip;
  }

  get uuid(): TripIdValueObject | undefined {
    return this.props.uuid;
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
