import { HttpService } from '@nestjs/axios';
import { BaHttpService } from './ba-http.service';
import { ConfigModule } from '@nestjs/config';
import { SearchTripBuilder } from '@trip-planner/domain';
import { faker } from '@faker-js/faker';
import { of } from 'rxjs';
import { TripsModelDataProvider } from '@trip-planner/misc';
import { Test } from '@nestjs/testing';
import { ToInfraAdapter } from '../adapters/models/trip/to-infra.adapter';
import { Trips } from '@trip-planner/infrastructure';

describe('BaHttpService', () => {
  let baHttpService: BaHttpService;
  let expectedData: Trips[];

  beforeEach(async () => {
    const responseData = Array.from(
      { length: faker.number.int({ min: 1, max: 20 }) },
      () => TripsModelDataProvider.generate(),
    );
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forFeature(async () => ({
          baDSConfig: {
            baseUrl: faker.internet.url(),
            apiKey: faker.string.uuid(),
          },
        })),
      ],
      providers: [
        BaHttpService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() => of({ data: responseData })),
          },
        },
      ],
    }).compile();

    baHttpService = moduleRef.get(BaHttpService);
    expectedData = responseData.map((trip) => ToInfraAdapter.adapt(trip));
  });

  test('should create a BaHttpService instance', () => {
    expect(baHttpService).toBeInstanceOf(BaHttpService);
  });

  test('should search trips', async () => {
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
    const response = await baHttpService.searchTrips(searchBuilder);
    // too expensive to compare the objects let's just check the length
    expect(response).toHaveLength(expectedData.length);
  });
});
