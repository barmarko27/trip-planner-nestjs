import { TripAggregateRoot } from '@trip-planner/domain';
import { FromDomain, ApplicationAdapter } from '@shared/application';
import { TripsDto } from '../../dtos/trips.dto';

export class FromDomainAdapter
  implements ApplicationAdapter<FromDomain<TripAggregateRoot, TripsDto>>
{
  static adapt(aggregateRoot: TripAggregateRoot): TripsDto {
    const trip = new TripsDto();
    trip.id = aggregateRoot.uuid!.toString()!;
    trip.origin = aggregateRoot.origin!.iataCode!.value;
    trip.destination = aggregateRoot.destination!.iataCode!.value;
    trip.duration = aggregateRoot.duration.inHours();
    trip.cost = aggregateRoot.cost.value();
    trip.type = aggregateRoot.type.value;
    trip.display_name = aggregateRoot.info.title;
    return trip;
  }
}
