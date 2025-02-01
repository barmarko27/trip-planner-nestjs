import { TripTypeEnum, TripTypeValueObject } from '@trip-planner/domain';

describe('TripTypeValueObject', () => {
  test('should create a trip type value object', () => {
    const type = TripTypeEnum.CAR;
    const tripTypeValueObject = TripTypeValueObject.create(type);

    expect(tripTypeValueObject.value).toEqual(type);
  });
});
