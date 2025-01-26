import { CompositeFilter, Filter, QueryBuilder } from '@shared/domain';

type QueryParams = { [key: string]: string };
/**
 * This class is responsible for building a query string from a QueryBuilder object.
 */
export class ToBaHttpRequestBuilder {
  static toQueryString<T>(builder: QueryBuilder<T>): string {
    const params: string[] = [];
    const query = builder.build();
    // Handle filters
    if (query.filters) {
      // This function is recursive, it will flatten the filters into a single array
      const flattenFilters = (filter: CompositeFilter<T> | Filter<T>): void => {
        if ('field' in filter) {
          const field = String(filter.field);
          const value = String(filter.value);
          params.push(`${field}=${encodeURIComponent(value)}`);
        } else {
          filter.filters.forEach(flattenFilters);
        }
      };
      flattenFilters(query.filters);
    }
    // Handle sorting (only the first sort option is used)
    if (query.sort && query.sort.length > 0) {
      const firstSort = query.sort[0];
      const field = String(firstSort.field);
      params.push(`sort_by=${field}`);
    }

    // Handle pagination
    if (query.pagination) {
      params.push(`page=${query.pagination.page}`);
      params.push(`pageSize=${query.pagination.pageSize}`);
    }

    return params.join('&');
  }

  static toParams<T>(builder: QueryBuilder<T>): QueryParams {
    const params: QueryParams = {};
    const query = builder.build();
    // Handle filters
    if (query.filters) {
      // This function is recursive, it will flatten the filters into a single array
      const flattenFilters = (filter: CompositeFilter<T> | Filter<T>): void => {
        if ('field' in filter) {
          const field = String(filter.field);
          const value = String(filter.value);
          params[field] = value;
        } else {
          filter.filters.forEach(flattenFilters);
        }
      };
      flattenFilters(query.filters);
    }
    // Handle sorting (only the first sort option is used)
    if (query.sort && query.sort.length > 0) {
      const firstSort = query.sort[0];
      params['sort_by'] = String(firstSort.field);
    }

    // Handle pagination
    if (query.pagination) {
      params['page'] = String(query.pagination.page);
      params['pageSize'] = String(query.pagination.pageSize);
    }

    return params;
  }
}
