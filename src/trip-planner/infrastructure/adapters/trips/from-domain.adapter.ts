import { TripAggregateRoot } from '@trip-planner/domain';
import { InfraAdapter, ToInfra } from '@shared/infrastructure';
import { Trips } from '../../entity/trips.entity';
import { Cities } from '../../entity/cities.entity';
import { TripsInformation } from '../../entity/trips-information.entity';

export class FromDomainAdapter
  implements InfraAdapter<ToInfra<TripAggregateRoot, Trips>>
{
  static adapt(tripAggregateRoot: TripAggregateRoot): Trips {
    const trip = new Trips();
    trip.destination = new Cities();
    trip.destination.iataCodes = [];
    trip.destination.iataCodes.push({
      code: tripAggregateRoot.destination.iataCode.value,
    });
    trip.origin = new Cities();
    trip.origin.iataCodes = [];
    trip.origin.iataCodes.push({
      code: tripAggregateRoot.origin.iataCode.value,
    });
    trip.cost = tripAggregateRoot.cost.value();
    trip.duration = tripAggregateRoot.duration.inHours();
    trip.type = tripAggregateRoot.type.toString();
    trip.information = new TripsInformation();
    trip.information.shortDescription = tripAggregateRoot.info.title;
    return trip;
  }
}
