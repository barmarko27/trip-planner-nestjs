import { SearchTripAggregateProps } from '@trip-planner/domain';
import { TypeORMQueryBuilder } from '@shared/infrastructure';
import { Trips } from '@trip-planner/infrastructure';

export class ToEntityBuilder extends TypeORMQueryBuilder<
  SearchTripAggregateProps,
  Trips
> {}
