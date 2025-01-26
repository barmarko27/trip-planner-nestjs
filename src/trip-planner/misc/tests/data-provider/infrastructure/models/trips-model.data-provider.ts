import { faker } from '@faker-js/faker';
import { TripsModel } from '../../../../../infrastructure/models/trips.model';
import {
  CitiesEntityDataProvider,
  TripsInformationEntityDataProvider,
} from '../entity';
import { TripTypesEnum } from '../../../../../constants/enum';

export class TripsModelDataProvider {
  static generate() {
    return {
      id: faker.string.uuid(),
      origin: CitiesEntityDataProvider.generate().iataCodes.pop()?.code,
      destination: CitiesEntityDataProvider.generate().iataCodes.pop()?.code,
      cost: Math.random(),
      duration: faker.number.int({ min: 1, max: 36 }),
      type: faker.helpers.enumValue(TripTypesEnum),
      display_name:
        TripsInformationEntityDataProvider.generate().shortDescription,
    } as TripsModel;
  }
}
