import { Inject, Injectable } from '@nestjs/common';
import { TripIdValueObject, TripRepository } from '@trip-planner/domain';
import { TripsDto } from '../dtos/trips.dto';

@Injectable()
export class DeleteService {
  constructor(
    @Inject('TripRepository') private readonly tripRepository: TripRepository,
  ) {}
  async execute(dto: Pick<TripsDto, 'id'>): Promise<void> {
    const id = TripIdValueObject.create(dto.id);
    return this.tripRepository.deleteById(id);
  }
}
