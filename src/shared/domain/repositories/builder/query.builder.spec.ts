import { Filter, QueryBuilder } from './query.builder';

describe('QueryBuilder', () => {
  interface TestEntity {
    id: number;
    name: string;
    age: number;
  }

  let queryBuilder: QueryBuilder<TestEntity>;

  beforeEach(() => {
    queryBuilder = new QueryBuilder<TestEntity>();
  });

  test('should add a filter', () => {
    const filter: Filter<TestEntity> = {
      field: 'age',
      operator: 'GREATER_THAN',
      value: 30,
    };

    queryBuilder.addFilter(filter);
    const query = queryBuilder.build();

    expect(query.filters).toEqual({
      operator: 'AND',
      filters: [filter],
    });
  });

  test('should add a composite filter', () => {
    const filter1: Filter<TestEntity> = {
      field: 'age',
      operator: 'GREATER_THAN',
      value: 30,
    };
    const filter2: Filter<TestEntity> = {
      field: 'name',
      operator: 'LIKE',
      value: 'John%',
    };

    queryBuilder.addCompositeFilter('OR', [filter1, filter2]);
    const query = queryBuilder.build();

    expect(query.filters).toEqual({
      operator: 'OR',
      filters: [filter1, filter2],
    });
  });

  test('should add sort options', () => {
    queryBuilder.addSort('name', 'ASC').addSort('age', 'DESC');
    const query = queryBuilder.build();

    expect(query.sort).toEqual([
      { field: 'name', direction: 'ASC' },
      { field: 'age', direction: 'DESC' },
    ]);
  });

  test('should set pagination', () => {
    queryBuilder.setPagination(2, 20);
    const query = queryBuilder.build();

    expect(query.pagination).toEqual({
      page: 2,
      pageSize: 20,
    });
  });

  test('should build a complete query', () => {
    const filter: Filter<TestEntity> = {
      field: 'age',
      operator: 'GREATER_THAN',
      value: 30,
    };

    queryBuilder.addFilter(filter).addSort('name', 'ASC').setPagination(1, 10);

    const query = queryBuilder.build();

    expect(query).toEqual({
      filters: {
        operator: 'AND',
        filters: [filter],
      },
      sort: [{ field: 'name', direction: 'ASC' }],
      pagination: {
        page: 1,
        pageSize: 10,
      },
    });
  });

  test('should handle empty query', () => {
    const query = queryBuilder.build();

    expect(query).toEqual({});
  });
});
