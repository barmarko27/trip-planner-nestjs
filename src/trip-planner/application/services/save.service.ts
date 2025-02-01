import { Inject, Injectable } from '@nestjs/common';
import { TripRepository } from '@trip-planner/domain';
import { RequestDto, ResponseDto } from '../dtos/save';
import { ToDomainAdapter } from '../adapters/save/to-domain.adapter';
import { FromDomainAdapter } from '../adapters/trip/from-domain.adapter';

@Injectable()
export class SaveService {
  constructor(
    @Inject('TripRepository') private readonly tripRepository: TripRepository,
  ) {}
  async execute(dto: RequestDto): Promise<ResponseDto> {
    const tripAggregateRoot = ToDomainAdapter.adapt(dto);
    const trip = await this.tripRepository.save(tripAggregateRoot);
    return {
      ...FromDomainAdapter.adapt(trip),
    } as ResponseDto;
  }
}
