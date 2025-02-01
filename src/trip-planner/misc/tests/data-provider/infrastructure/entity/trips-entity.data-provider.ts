import { CitiesEntityDataProvider } from './cities-entity.data-provider';
import { TripTypesEnum } from '../../../../../constants/enum';
import { TripsInformationEntityDataProvider } from './trips-information-entity.data-provider';
import { faker } from '@faker-js/faker';
import { Trips } from '@trip-planner/infrastructure';

export class TripsEntityDataProvider {
  static generate() {
    const trip = new Trips();
    trip.origin = CitiesEntityDataProvider.generate();
    trip.destination = CitiesEntityDataProvider.generate();
    trip.cost = Math.random();
    trip.duration = faker.number.int({ min: 1, max: 36 });
    trip.type = faker.helpers.enumValue(TripTypesEnum);
    trip.id = faker.string.uuid();
    trip.information = TripsInformationEntityDataProvider.generate();
    return trip;
  }
}
