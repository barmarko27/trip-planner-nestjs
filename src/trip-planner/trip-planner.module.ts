import { Module } from '@nestjs/common';
import { TripsController } from './application/controllers/trips.controller';
import { FindTripService } from './application/services/find-trip.service';
import { HttpModule } from '@nestjs/axios';
import { TripsRepository } from './infrastructure/repositories/trips.repository';
import { BaHttpService } from './infrastructure/services/ba-http.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';

@Module({
  controllers: [TripsController],
  providers: [
    FindTripService,
    { provide: 'TripRepository', useClass: TripsRepository },
    BaHttpService,
  ],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  exports: ['TripRepository'],
})
export class TripPlannerModule {}
