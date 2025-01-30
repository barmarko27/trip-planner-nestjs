import {
  FindOptionsWhere,
  FindManyOptions,
  Equal,
  MoreThan,
  LessThan,
  MoreThanOrEqual,
  LessThanOrEqual,
  Like,
  FindOptionsOrder,
} from 'typeorm';
import {
  CompositeFilter,
  Filter,
  Pagination,
  Query,
  SortOption,
} from '@shared/domain';
import { NotEquals } from 'class-validator';

export class TypeORMQueryBuilder<AggregateProps, T> {
  /**
   * Build the `where` clause recursively
   */
  private buildWhere(
    filter: CompositeFilter<AggregateProps> | Filter<AggregateProps>,
  ): FindOptionsWhere<T> | FindOptionsWhere<T>[] {
    if ('filters' in filter) {
      // Composite filter
      const filters = filter.filters.map((f) => this.buildWhere(f));
      return filters.reduce((acc, f) => ({ ...acc, ...f }), {});
    } else {
      // Single filter
      return this.buildCondition(filter);
    }
  }

  /**
   * Build a single condition
   */
  private buildCondition(filter: Filter<AggregateProps>): FindOptionsWhere<T> {
    const { field, operator, value } = filter;
    switch (operator) {
      case 'EQUAL':
        return { [field]: Equal(value) } as FindOptionsWhere<T>;
      case 'NOT_EQUAL':
        return {
          [field]: NotEquals(value),
        } as FindOptionsWhere<T>;
      case 'GREATER_THAN':
        return { [field]: MoreThan(value) } as FindOptionsWhere<T>;
      case 'LESS_THAN':
        return { [field]: LessThan(value) } as FindOptionsWhere<T>;
      case 'GREATER_THAN_OR_EQUAL':
        return {
          [field]: MoreThanOrEqual(value),
        } as FindOptionsWhere<T>;
      case 'LESS_THAN_OR_EQUAL':
        return {
          [field]: LessThanOrEqual(value),
        } as FindOptionsWhere<T>;
      case 'LIKE':
        return { [field]: Like(value) } as FindOptionsWhere<T>;
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  }

  /**
   * Build the `order` clause
   */
  private buildOrder(
    sortOptions?: SortOption<AggregateProps>[],
  ): FindManyOptions<T>['order'] | undefined {
    if (!sortOptions) return undefined;
    /*sortOptions.reduce((order, sort) => {
      return (order[sort.field as keyof T] = sort.direction);
    }, {});*/
    return {} as FindManyOptions<T>['order'];
  }

  /**
   * Build the `skip` and `take` options for pagination
   */
  private buildPagination(pagination?: Pagination): {
    skip?: number;
    take?: number;
  } {
    if (!pagination) return {};
    const { page, pageSize } = pagination;
    return {
      skip: (page - 1) * pageSize,
      take: pageSize,
    };
  }

  /**
   * Build the final options for the `find` method
   */
  build(query: Query<AggregateProps>): FindManyOptions<T> {
    const where = query.filters ? this.buildWhere(query.filters) : undefined;
    const order = this.buildOrder(query.sort);
    const pagination = this.buildPagination(query.pagination);

    return {
      where,
      order,
      ...pagination,
    };
  }
}
