import { Cities } from '../../../../../infrastructure/entity/cities.entity';
import { IataEntityDataProvider } from './iata-entity.data-provider';
import { faker } from '@faker-js/faker';

export class CitiesEntityDataProvider {
  static generate() {
    const city = new Cities();
    city.iataCodes.push(IataEntityDataProvider.generate());
    city.id = faker.string.uuid();
    city.shortDescription = faker.location.city();
    return city;
  }
}
