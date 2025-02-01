import { Module } from '@nestjs/common';
import { TripsController } from './controllers/trips.controller';
import {
  DeleteService,
  SearchService,
  SaveService,
  FindService,
} from './services';
import { TripInfrastructureModule } from '@trip-planner/infrastructure';

@Module({
  controllers: [TripsController],
  providers: [DeleteService, FindService, SearchService, SaveService],
  imports: [TripInfrastructureModule],
})
export class TripApplicationModule {}
