import { Controller, Get, Query } from '@nestjs/common';
import { FindTripService } from '../services/find-trip.service';
import { ApiResponse } from '@nestjs/swagger';
import { RequestDto } from '../dtos/find-by-destination-origin/request.dto';
import { buildFailRestResponse, validationPipe } from '@shared/application';
import { TripsDto } from '../dtos/trips.dto';

@Controller('trips')
export class TripsController {
  constructor(private readonly service: FindTripService) {}
  @ApiResponse({
    description: 'Trips found',
    type: TripsDto,
    status: 200,
    isArray: true,
  })
  @ApiResponse(buildFailRestResponse({ description: 'Bad request' }))
  @Get('search')
  async search(@Query(validationPipe) query: RequestDto): Promise<TripsDto[]> {
    return this.service.execute(query);
  }
}
