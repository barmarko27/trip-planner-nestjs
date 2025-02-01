import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { TripInfrastructureModule } from '@trip-planner/infrastructure';
import { TripApplicationModule } from './application/trip-application.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TripInfrastructureModule,
    TripApplicationModule,
  ],
})
export class TripPlannerModule {}
