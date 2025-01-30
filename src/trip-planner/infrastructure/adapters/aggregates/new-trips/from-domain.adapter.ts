import { NewTripAggregateRoot } from '@trip-planner/domain';
import { InfraAdapter, ToInfra } from '@shared/infrastructure';
import { Trips, TripsInformation } from '@trip-planner/infrastructure';
import { FromDomainBaseAdapter } from '../from-domain-base.adapter';

export class FromDomainAdapter
  extends FromDomainBaseAdapter
  implements InfraAdapter<ToInfra<NewTripAggregateRoot, Trips>>
{
  static adapt(newtripAggregateRoot: NewTripAggregateRoot): Trips {
    const trip = new Trips();
    trip.destination = FromDomainAdapter.buildCity(
      newtripAggregateRoot.destination.iataCode.value,
    );
    trip.origin = FromDomainAdapter.buildCity(
      newtripAggregateRoot.origin.iataCode.value,
    );
    trip.cost = newtripAggregateRoot.cost.value();
    trip.duration = newtripAggregateRoot.duration.inHours();
    trip.type = newtripAggregateRoot.type.value;
    trip.information = new TripsInformation();
    trip.information.shortDescription = newtripAggregateRoot.info.title;
    return trip;
  }
}
