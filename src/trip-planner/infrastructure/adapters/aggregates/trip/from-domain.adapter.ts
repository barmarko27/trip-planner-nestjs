import { TripAggregateRoot } from '@trip-planner/domain';
import { InfraAdapter, ToInfra } from '@shared/infrastructure';
import { Trips, TripsInformation } from '@trip-planner/infrastructure';
import { FromDomainBaseAdapter } from '../from-domain-base.adapter';

export class FromDomainAdapter
  extends FromDomainBaseAdapter
  implements InfraAdapter<ToInfra<TripAggregateRoot, Trips>>
{
  static adapt(tripAggregateRoot: TripAggregateRoot): Trips {
    const trip = new Trips();
    trip.destination = FromDomainAdapter.buildCity(
      tripAggregateRoot.destination.iataCode.value,
    );
    trip.origin = FromDomainAdapter.buildCity(
      tripAggregateRoot.origin.iataCode.value,
    );
    trip.cost = tripAggregateRoot.cost.value();
    trip.duration = tripAggregateRoot.duration.inHours();
    trip.type = tripAggregateRoot.type.value;
    trip.information = new TripsInformation();
    trip.information.shortDescription = tripAggregateRoot.info.title;
    trip.id = tripAggregateRoot.uuid.toString();
    return trip;
  }
}
