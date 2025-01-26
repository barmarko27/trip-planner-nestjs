import {
  CityEntity,
  IataCodeValueObject,
  TripAggregateRoot,
  TripCostValueObject,
  TripDurationValueObject,
  TripIdValueObject,
  TripInfoEntity,
  TripTypeEnum,
  TripTypeValueObject,
} from '@trip-planner/domain';
import { InfraAdapter, ToDomain } from '@shared/infrastructure';
import { Trips } from '../../entity/trips.entity';

export class ToDomainAdapter
  implements InfraAdapter<ToDomain<Trips, TripAggregateRoot>>
{
  static adapt(trip: Trips): TripAggregateRoot {
    return TripAggregateRoot.create({
      uuid: trip.id ? TripIdValueObject.create(trip.id) : undefined,
      origin: CityEntity.create({
        iataCode: IataCodeValueObject.create(trip.origin.iataCodes[0].code),
      }),
      destination: CityEntity.create({
        iataCode: IataCodeValueObject.create(
          trip.destination.iataCodes[0].code,
        ),
      }),
      duration: TripDurationValueObject.create(trip.duration),
      type: TripTypeValueObject.create(
        TripTypeEnum[trip.type.toUpperCase() as keyof typeof TripTypeEnum],
      ),
      cost: TripCostValueObject.create({ amount: trip.cost }),
      info: TripInfoEntity.create({ title: trip.information.shortDescription }),
    });
  }
}
