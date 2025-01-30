import {
  CityEntity,
  IataCodeValueObject,
  SearchTripAggregateRoot,
} from '@trip-planner/domain';
import { ApplicationAdapter, ToDomain } from '@shared/application';
import { RequestDto } from '../../dtos/search';

export class ToDomainAdapter
  implements ApplicationAdapter<ToDomain<RequestDto, SearchTripAggregateRoot>>
{
  static adapt(dto: RequestDto): SearchTripAggregateRoot {
    return SearchTripAggregateRoot.create({
      origin: CityEntity.create({
        iataCode: IataCodeValueObject.create(dto.origin),
      }),
      destination: CityEntity.create({
        iataCode: IataCodeValueObject.create(dto.destination),
      }),
    });
  }
}
