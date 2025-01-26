import { QueryBuilder } from '@shared/domain';
import { SearchTripAggregateProps } from '../../aggregates/search-trip.aggregate-root';

export class SearchTripBuilder extends QueryBuilder<SearchTripAggregateProps> {}
