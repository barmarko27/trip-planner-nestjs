import { Inject, Injectable } from '@nestjs/common';
import { TripRepository } from '@trip-planner/domain';
import { FromDomainAdapter } from '../adapters/trip/from-domain.adapter';
import { RequestDto } from '../dtos/find/request.dto';
import { TripsDto } from '../dtos/trips.dto';

@Injectable()
export class FindService {
  constructor(
    @Inject('TripRepository') private readonly tripRepository: TripRepository,
  ) {}
  async execute(dto: RequestDto): Promise<TripsDto[]> {
    const trips = await this.tripRepository.find(
      dto.page ?? 1,
      dto.limit ?? 10,
    );
    return trips.map((trip) => FromDomainAdapter.adapt(trip));
  }
}
