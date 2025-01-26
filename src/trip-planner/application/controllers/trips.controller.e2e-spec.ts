import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TripPlannerModule } from '../../trip-planner.module';
import { FindTripService } from '../services/find-trip.service';

describe('Trips', () => {
  let app: INestApplication;
  const findTripService = {
    execute: () => [],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TripPlannerModule],
    })
      .overrideProvider(FindTripService)
      .useValue(findTripService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET search`, () => {
    return request(app.getHttpServer())
      .get('/trips/search?origin=AMS&destination=ATL&sort=cheapest')
      .expect(200)
      .expect(findTripService.execute());
  });

  afterAll(async () => {
    await app.close();
  });
});
