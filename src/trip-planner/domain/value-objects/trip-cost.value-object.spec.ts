import { TripCostValueObject } from '@trip-planner/domain';
import { TripCostException } from '../exception/trip-cost.exception';

describe('TripCostValueObject', () => {
  test('should create a trip cost value object', () => {
    const amount = 100;
    const currencyCode = 'EUR';
    const tripCostValueObject = TripCostValueObject.create({
      amount,
      currencyCode,
    });

    expect(tripCostValueObject.value()).toEqual(amount);
    expect(tripCostValueObject.getCurrencyCode()).toEqual(currencyCode);
    expect(tripCostValueObject.toString()).toEqual(
      `${currencyCode} ${amount.toFixed(2)}`,
    );
  });

  test('should throw an error if the trip amount is invalid', () => {
    expect(() => TripCostValueObject.create({ amount: -1 })).toThrow(
      TripCostException,
    );
  });

  test('should throw an error if the trip currency is invalid', () => {
    expect(() =>
      TripCostValueObject.create({
        currencyCode: 'WRONG_CURRENCY',
        amount: 11,
      }),
    ).toThrow(TripCostException);
  });
});
