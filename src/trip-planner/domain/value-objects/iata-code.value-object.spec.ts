import { IataCodeValueObject } from '@trip-planner/domain';
import { randomIataCode } from '../../misc/tests/data-provider/utils';
import { IataCodeException } from '../exception/iata-code.exception';

describe('IataCodeValueObject', () => {
  test('should create a valid IataCodeValueObject instance', () => {
    const code = randomIataCode();
    const iataCode = IataCodeValueObject.create(code);
    expect(iataCode.value).toEqual(code);
  });

  test('should throw an error if IataCodeValueObject is invalid', () => {
    expect(() => IataCodeValueObject.create('INVALID')).toThrowError(
      IataCodeException,
    );
  });
});
