import { faker } from '@faker-js/faker';
import { TripsInformation } from '@trip-planner/infrastructure';

export class TripsInformationEntityDataProvider {
  static generate(): TripsInformation {
    const tripsInformation = new TripsInformation();
    tripsInformation.id = faker.string.uuid();
    tripsInformation.shortDescription = faker.lorem.sentence();
    tripsInformation.lang = faker.helpers.arrayElement([
      'en',
      'es',
      'fr',
      'de',
      'it',
      'pt',
    ]);
    return tripsInformation;
  }
}
