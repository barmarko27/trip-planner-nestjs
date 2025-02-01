import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { TripsModel } from '../models/trips.model';
import { SearchTripBuilder } from '@trip-planner/domain';
import { ToBaHttpRequestBuilder } from '../adapters/builder/to-ba-http-request.builder';
import { ConfigService } from '@nestjs/config';
import { Trips } from '@trip-planner/infrastructure';
import { ToInfraAdapter } from '../adapters/models/trip/to-infra.adapter';

@Injectable()
export class BaHttpService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async searchTrips(criteria: SearchTripBuilder): Promise<Trips[]> {
    // Build the full endpoint
    const endpoint = this.buildFullEndpoint('/default/trips');
    // Get the headers
    const headers = this.getHeaders();
    // Convert the criteria to the query params
    const params = ToBaHttpRequestBuilder.toParams(criteria);
    // Convert the response to the infrastructure model
    return firstValueFrom(
      this.httpService
        .get(endpoint, { headers, params })
        .pipe(
          map((resp) =>
            resp.data?.map((trip: TripsModel) => ToInfraAdapter.adapt(trip)),
          ),
        ),
    );
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
