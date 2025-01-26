import {
  SearchTripBuilder,
  TripAggregateRoot,
  TripRepository,
} from '@trip-planner/domain';
import { Inject, Injectable } from '@nestjs/common';
import { BaHttpService } from '../services/ba-http.service';

@Injectable()
export class TripsRepository implements TripRepository {
  constructor(
    @Inject(BaHttpService) private readonly baHttpService: BaHttpService,
  ) {}

  async search(criteria: SearchTripBuilder): Promise<TripAggregateRoot[]> {
    return this.baHttpService.searchTrips(criteria);
  }
}
