import { Iata } from '../../../../../infrastructure/entity/iata.entity';
import { faker } from '@faker-js/faker';
import { randomIataCode } from '../../utils';

export class IataEntityDataProvider {
  static generate(): Iata {
    const iata = new Iata();
    iata.code = randomIataCode();
    iata.id = faker.string.uuid();
    iata.name = faker.location.streetAddress({ useFullAddress: true });
    iata.latitude = faker.location.latitude();
    iata.longitude = faker.location.longitude();
    return iata;
  }
}
