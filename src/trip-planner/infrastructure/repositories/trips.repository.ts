import {
  NewTripAggregateRoot,
  SearchTripBuilder,
  TripAggregateRoot,
  TripIdValueObject,
  TripRepository,
} from '@trip-planner/domain';
import { Inject, Injectable } from '@nestjs/common';
import { BaHttpService } from '../services/ba-http.service';
import { Trips } from '../entities/trips.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToDomainAdapter } from '../adapters/aggregates/trip/to-domain.adapter';
import { FromDomainAdapter } from '../adapters/aggregates/new-trips/from-domain.adapter';

@Injectable()
export class TripsRepository implements TripRepository {
  constructor(
    @Inject(BaHttpService) private readonly baHttpService: BaHttpService,
    @InjectRepository(Trips)
    private entityRepository: Repository<Trips>,
  ) {}

  async search(criteria: SearchTripBuilder): Promise<TripAggregateRoot[]> {
    const trips = await this.baHttpService.searchTrips(criteria);
    return trips.map((trip) => ToDomainAdapter.adapt(trip));
  }

  async save(trip: NewTripAggregateRoot): Promise<TripAggregateRoot> {
    const savedTrip = await this.entityRepository.save(
      FromDomainAdapter.adapt(trip),
    );
    return ToDomainAdapter.adapt(savedTrip);
  }

  async find(page = 1, limit = 10): Promise<TripAggregateRoot[]> {
    const trips = await this.entityRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: [
        'origin',
        'destination',
        'information',
        'origin.iataCodes',
        'destination.iataCodes',
      ],
    });
    return trips.map((trip) => ToDomainAdapter.adapt(trip));
  }

  async deleteById(tripId: TripIdValueObject): Promise<void> {
    await this.entityRepository.delete(tripId.value);
  }
}
