type LogicalOperator = 'AND' | 'OR';

export type ComparisonOperator =
  | 'EQUAL'
  | 'NOT_EQUAL'
  | 'GREATER_THAN'
  | 'LESS_THAN'
  | 'GREATER_THAN_OR_EQUAL'
  | 'LESS_THAN_OR_EQUAL'
  | 'LIKE';

// Base filter type
export interface Filter<T> {
  field: keyof T;
  operator: ComparisonOperator;
  value: any;
}

// Composite filter for nested logic
export interface CompositeFilter<T> {
  operator: LogicalOperator;
  filters: (Filter<T> | CompositeFilter<T>)[];
}

// Sorting options
export interface SortOption<T> {
  field: keyof T;
  direction: 'ASC' | 'DESC';
}

// Pagination options
export interface Pagination {
  page: number;
  pageSize: number;
}

// Query definition
export interface Query<T> {
  filters?: CompositeFilter<T>;
  sort?: SortOption<T>[];
  pagination?: Pagination;
}

export class QueryBuilder<T> {
  private filters: CompositeFilter<T> | null = null;
  private sortOptions: SortOption<T>[] = [];
  private pagination: Pagination | null = null;

  /**
   * Add a filter
   * @param filter
   */
  addFilter(filter: Filter<T>): this {
    if (!this.filters) {
      this.filters = { operator: 'AND', filters: [filter] };
    } else {
      this.filters.filters.push(filter);
    }
    return this;
  }

  /**
   * Add a composite filter
   * @param operator
   * @param filters
   */
  addCompositeFilter(
    operator: LogicalOperator,
    filters: (Filter<T> | CompositeFilter<T>)[],
  ): this {
    const compositeFilter: CompositeFilter<T> = { operator, filters };
    if (!this.filters) {
      this.filters = compositeFilter;
    } else {
      this.filters.filters.push(compositeFilter);
    }
    return this;
  }

  /**
   * Add a sort option
   * @param field
   * @param direction
   */
  addSort(field: keyof T, direction: 'ASC' | 'DESC'): this {
    this.sortOptions.push({ field, direction });
    return this;
  }

  /**
   * Set pagination options
   * @param page
   * @param pageSize
   */
  setPagination(page: number, pageSize: number): this {
    this.pagination = { page, pageSize };
    return this;
  }

  /**
   * Build the query
   */
  build(): Query<T> {
    return {
      filters: this.filters || undefined,
      sort: this.sortOptions.length > 0 ? this.sortOptions : undefined,
      pagination: this.pagination || undefined,
    };
  }
}
