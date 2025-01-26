import { TripInfoEntity } from '@trip-planner/domain';
import { faker } from '@faker-js/faker';

export class TripInfoDataProvider {
  static generate() {
    return TripInfoEntity.create({
      title: faker.lorem.words(3),
      description: faker.lorem.words(10),
    });
  }
}
