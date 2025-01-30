import { IataEntityDataProvider } from './iata-entity.data-provider';
import { faker } from '@faker-js/faker';
import { Cities } from '@trip-planner/infrastructure';

export class CitiesEntityDataProvider {
  static generate() {
    const city = new Cities();
    city.iataCodes = [];
    city.iataCodes.push(IataEntityDataProvider.generate());
    city.id = faker.string.uuid();
    city.shortDescription = faker.location.city();
    return city;
  }
}
