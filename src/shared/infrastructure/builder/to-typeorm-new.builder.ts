import {
  CompositeFilter,
  Filter,
  Pagination,
  QueryBuilder,
  SortOption,
} from '@shared/domain';
import { SelectQueryBuilder } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

export abstract class TypeORMQueryBuilder<
  T extends ObjectLiteral,
  AggregateQueryBuilder extends QueryBuilder<any>,
> {
  private queryBuilder: SelectQueryBuilder<T>;
  constructor() {}
  /**
   * Apply a filter to the query
   */
  private applyFilter(
    filter: Filter<any> | CompositeFilter<any>,
    alias: string = '',
  ): void {
    if ('filters' in filter) {
      // Composite filter
      const conditions = filter.filters.map((f, index) => {
        const subAlias = `${alias}${index}`;
        if ('filters' in f) {
          this.applyFilter(f, subAlias);
          return `(${subAlias})`;
        } else {
          const paramKey = `${alias}_${String(f.field)}`;
          const condition = this.buildCondition(f, paramKey);
          this.queryBuilder.andWhere(condition, { [paramKey]: f.value });
          return condition;
        }
      });

      const combinedCondition = conditions.join(
        filter.operator === 'AND' ? ' AND ' : ' OR ',
      );
      this.queryBuilder.andWhere(combinedCondition);
    } else {
      // Single filter
      const paramKey = `${alias}_${String(filter.field)}`;
      const condition = this.buildCondition(filter, paramKey);
      this.queryBuilder.andWhere(condition, { [paramKey]: filter.value });
    }
  }

  /**
   * Build a single condition
   */
  private buildCondition(filter: Filter<any>, paramKey: string): string {
    const field = `${this.queryBuilder.alias}.${String(filter.field)}`;
    switch (filter.operator) {
      case 'EQUAL':
        return `${field} = :${paramKey}`;
      case 'NOT_EQUAL':
        return `${field} != :${paramKey}`;
      case 'GREATER_THAN':
        return `${field} > :${paramKey}`;
      case 'LESS_THAN':
        return `${field} < :${paramKey}`;
      case 'GREATER_THAN_OR_EQUAL':
        return `${field} >= :${paramKey}`;
      case 'LESS_THAN_OR_EQUAL':
        return `${field} <= :${paramKey}`;
      case 'LIKE':
        return `${field} LIKE :${paramKey}`;
      default:
        throw new Error(`Unsupported operator: ${filter.operator}`);
    }
  }

  /**
   * Apply sorting to the query
   */
  private applySort(sortOptions: SortOption<any>[]): void {
    for (const sort of sortOptions) {
      this.queryBuilder.addOrderBy(
        `${this.queryBuilder.alias}.${String(sort.field)}`,
        sort.direction,
      );
    }
  }

  /**
   * Apply pagination to the query
   */
  private applyPagination(pagination: Pagination): void {
    const { page, pageSize } = pagination;
    this.queryBuilder.skip((page - 1) * pageSize).take(pageSize);
  }

  /**
   * Build the TypeORM query
   */
  public build(builder: AggregateQueryBuilder): SelectQueryBuilder<T> {
    const query = builder.build();

    if (query.filters) {
      this.applyFilter(query.filters);
    }
    if (query.sort) {
      this.applySort(query.sort);
    }
    if (query.pagination) {
      this.applyPagination(query.pagination);
    }
    return this.queryBuilder;
  }
}
