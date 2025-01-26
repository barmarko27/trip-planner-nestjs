import { IataCodeValueObject } from '@trip-planner/domain';
import { randomIataCode } from '../../utils';

/**
 * @description Data provider for IataCodeValueObject
 */
export class IataValueObjectDataProvider {
  /**
   * @description Generate a new IataCodeValueObject with random data
   */
  static generate() {
    return IataCodeValueObject.create(randomIataCode());
  }
}
