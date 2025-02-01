import { ToBaHttpRequestBuilder } from './to-ba-http-request.builder';
import { SearchTripBuilder } from '@trip-planner/domain';

describe('ToBaHttpRequestBuilder', () => {
  let toBaHttpRequestBuilder: ToBaHttpRequestBuilder;

  beforeEach(() => {
    toBaHttpRequestBuilder = new ToBaHttpRequestBuilder();
  });

  test('should create a ToBaHttpRequestBuilder instance', () => {
    expect(toBaHttpRequestBuilder).toBeInstanceOf(ToBaHttpRequestBuilder);
  });

  test('should translate query builder to params', () => {
    const searchBuilder = new SearchTripBuilder();
    searchBuilder.addCompositeFilter('AND', [
      {
        field: 'origin',
        value: 'ATL',
        operator: 'EQUAL',
      },
      {
        field: 'destination',
        value: 'AMS',
        operator: 'EQUAL',
      },
    ]);
    searchBuilder.addSort('duration', 'DESC');
    const toParams = ToBaHttpRequestBuilder.toParams(searchBuilder);
    expect(toParams).toEqual({
      origin: 'ATL',
      destination: 'AMS',
      sort_by: 'duration',
    });
  });

  test('should translate query builder to querystring', () => {
    const searchBuilder = new SearchTripBuilder();
    searchBuilder.addCompositeFilter('AND', [
      {
        field: 'origin',
        value: 'ATL',
        operator: 'EQUAL',
      },
      {
        field: 'destination',
        value: 'AMS',
        operator: 'EQUAL',
      },
    ]);
    searchBuilder.addSort('duration', 'DESC');
    const toParams = ToBaHttpRequestBuilder.toQueryString(searchBuilder);
    expect(toParams).toEqual('origin=ATL&destination=AMS&sort_by=duration');
  });
});
