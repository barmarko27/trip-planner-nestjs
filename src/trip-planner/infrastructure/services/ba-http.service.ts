import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map, tap } from 'rxjs';
import { TripsModel } from '../models/trips.model';
import { ToDomainAdapter } from '../adapters/trips/to-domain.adapter';
import { SearchTripBuilder, TripAggregateRoot } from '@trip-planner/domain';
import { ToBaHttpRequestBuilder } from '../adapters/builder/to-ba-http-request.builder';
import { ConfigService } from '@nestjs/config';
import { ToInfraAdapter } from '../adapters/trips/to-infra.adapter';
import { Trips } from '../entity/trips.entity';

@Injectable()
export class BaHttpService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async searchTrips(criteria: SearchTripBuilder): Promise<TripAggregateRoot[]> {
    const endpoint = this.buildFullEndpoint('/default/trips');
    const headers = this.getHeaders();
    const params = ToBaHttpRequestBuilder.toParams(criteria);
    // Convert the response to the infrastructure model
    const trips: Trips[] = await firstValueFrom(
      this.httpService
        .get(endpoint, { headers, params })
        .pipe(
          map((resp) =>
            resp.data?.map((trip: TripsModel) => ToInfraAdapter.adapt(trip)),
          ),
        ),
    );
    // Convert the infrastructure model to the domain model
    return trips.map((trip) => ToDomainAdapter.adapt(trip));
  }

  private getHeaders() {
    return {
      'x-api-key': this.configService.get<string>('baDSConfig.apiKey'),
    };
  }

  private buildFullEndpoint(endpoint: string): string {
    const baseUrl = this.configService.get<string>('baDSConfig.baseUrl');
    if (!baseUrl) {
      throw new Error('baseUrl not found');
    }
    // Remove the trailing slash from the baseUrl and the leading slash from the endpoint and concatenate them
    return `${baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\/+/g, '')}`;
  }
}
