import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  DeleteService,
  SearchService,
  SaveService,
  FindService,
} from '../services';
import { ApiResponse } from '@nestjs/swagger';
import { RequestDto as FindByDestinationOriginDto } from '../dtos/search/request.dto';
import { buildFailRestResponse, validationPipe } from '@shared/application';
import { TripsDto } from '../dtos/trips.dto';
import {
  ResponseDto as SavedTripDto,
  RequestDto as SaveTripDto,
} from '../dtos/save';
import { RequestDto as DeleteDto } from '../dtos/delete/request.dto';
import { RequestDto as FindTripsDto } from '../dtos/find/request.dto';

@Controller('trips')
export class TripsController {
  constructor(
    private readonly deleteTripByIdService: DeleteService,
    private readonly findTripService: FindService,
    private readonly searchTripService: SearchService,
    private readonly saveTripService: SaveService,
  ) {}
  @ApiResponse({
    description: 'Trips found',
    type: TripsDto,
    status: HttpStatus.OK,
    isArray: true,
  })
  @ApiResponse(buildFailRestResponse({ description: 'Bad request' }))
  @Get('search')
  async search(
    @Query(validationPipe) query: FindByDestinationOriginDto,
  ): Promise<TripsDto[]> {
    return this.searchTripService.execute(query);
  }

  @ApiResponse({
    description: 'Trip created',
    type: TripsDto,
    status: HttpStatus.CREATED,
  })
  @ApiResponse(buildFailRestResponse({ description: 'Bad request' }))
  @Post('/')
  async save(@Body(validationPipe) query: SaveTripDto): Promise<SavedTripDto> {
    return this.saveTripService.execute(query);
  }

  @ApiResponse({
    description: 'Trips found',
    type: TripsDto,
    isArray: true,
    status: HttpStatus.OK,
  })
  @ApiResponse(buildFailRestResponse({ description: 'Bad request' }))
  @Get('/')
  async find(@Query(validationPipe) query: FindTripsDto): Promise<TripsDto[]> {
    return this.findTripService.execute(query);
  }

  @ApiResponse({
    description: 'Trip deleted',
    type: TripsDto,
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse(buildFailRestResponse({ description: 'Bad request' }))
  @Delete('/:id')
  async delete(@Param(validationPipe) id: DeleteDto): Promise<void> {
    return this.deleteTripByIdService.execute(id);
  }
}
