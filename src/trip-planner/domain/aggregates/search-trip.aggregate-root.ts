import { AggregateRoot } from '@shared/domain';
import { Trip } from './trip';
import { TripSearchedEvent } from '../events';
import { CityEntity } from '../entities';
import { SameRouteException } from '../exception/same-route.exception';

export type SearchTripAggregateProps = Pick<Trip, 'origin' | 'destination'> &
  Partial<Pick<Trip, 'duration' | 'cost'>>;

export class SearchTripAggregateRoot extends AggregateRoot<SearchTripAggregateProps> {
  private constructor(props: SearchTripAggregateProps) {
    super(props);
  }

  /**
   * Create a new TripAggregateRoot
   * @param props
   */
  static create(props: SearchTripAggregateProps): SearchTripAggregateRoot {
    const trip = new SearchTripAggregateRoot(props);
    const origin = trip.origin.iataCode;
    const destination = trip.destination.iataCode;
    if (origin.equals(destination)) {
      throw new SameRouteException(
        `The Origin ${origin.value} cannot be the same as the Destination ${destination.value}`,
      );
    }
    trip.addDomainEvent(new TripSearchedEvent(trip));
    return trip;
  }

  get origin(): CityEntity {
    return this.props.origin;
  }

  get destination(): CityEntity {
    return this.props.destination;
  }
}
