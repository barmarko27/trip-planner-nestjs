import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsRepository } from './repositories/trips.repository';
import { HttpModule } from '@nestjs/axios';
import { BaHttpService } from './services/ba-http.service';
import { Cities, Iata, Trips, TripsInformation } from './entities';

@Module({
  providers: [
    { provide: 'TripRepository', useClass: TripsRepository },
    BaHttpService,
  ],
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: `./data/${process.env.SQLITE_DB_NAME ?? 'db'}`,
      synchronize: true,
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
    }),
    TypeOrmModule.forFeature([Cities, Iata, Trips, TripsInformation]),
  ],
  exports: ['TripRepository'],
})
export class TripInfrastructureModule {}
