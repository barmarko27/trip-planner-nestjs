import {
  CityEntity,
  IataCodeValueObject,
  NewTripAggregateRoot,
  TripAggregateRoot,
  TripCostValueObject,
  TripDurationValueObject,
  TripInfoEntity,
  TripTypeEnum,
  TripTypeValueObject,
} from '@trip-planner/domain';
import { ApplicationAdapter, ToDomain } from '@shared/application';
import { RequestDto } from '../../dtos/save';

export class ToDomainAdapter
  implements ApplicationAdapter<ToDomain<RequestDto, TripAggregateRoot>>
{
  static adapt(dto: RequestDto): NewTripAggregateRoot {
    // Create the origin CityEntity
    const origin = CityEntity.create({
      iataCode: IataCodeValueObject.create(dto.origin),
    });
    // Create the destination CityEntity
    const destination = CityEntity.create({
      iataCode: IataCodeValueObject.create(dto.destination),
    });
    // Create the duration TripDurationValueObject
    const duration = TripDurationValueObject.create(dto.duration);
    // Create the type TripTypeValueObject
    const type = TripTypeValueObject.create(
      TripTypeEnum[dto.type.toUpperCase() as keyof typeof TripTypeEnum],
    );
    // Create the cost TripCostValueObject
    const cost = TripCostValueObject.create({ amount: dto.cost });
    // Create the info TripInfoEntity
    const info = TripInfoEntity.create({ title: dto.display_name });
    // Create the NewTripAggregateRoot
    return NewTripAggregateRoot.create({
      origin,
      destination,
      duration,
      type,
      cost,
      info,
    });
  }
}
