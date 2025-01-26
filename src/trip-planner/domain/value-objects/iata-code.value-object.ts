import { TinyTypeOf } from 'tiny-types';
import { IataCodeException } from '../exception/iata-code.exception';

export class IataCodeValueObject extends TinyTypeOf<string>() {
  private constructor(value: string) {
    super(value);
  }
  /**
   * Create a new IataIdValueObject
   * @param value
   */
  public static create(value: string): IataCodeValueObject {
    if (!IataCodeValueObject.isValidIataCode(value)) {
      throw new IataCodeException('Iata code is invalid');
    }
    return new IataCodeValueObject(value);
  }

  private static isValidIataCode(code: string): boolean {
    const codes = [
      'ATL',
      'PEK',
      'LAX',
      'DXB',
      'HND',
      'ORD',
      'LHR',
      'PVG',
      'CDG',
      'DFW',
      'AMS',
      'FRA',
      'IST',
      'CAN',
      'JFK',
      'SIN',
      'DEN',
      'ICN',
      'BKK',
      'SFO',
      'LAS',
      'CLT',
      'MIA',
      'KUL',
      'SEA',
      'MUC',
      'EWR',
      'MAD',
      'HKG',
      'MCO',
      'PHX',
      'IAH',
      'SYD',
      'MEL',
      'GRU',
      'YYZ',
      'LGW',
      'BCN',
      'MAN',
      'BOM',
      'DEL',
      'ZRH',
      'SVO',
      'DME',
      'JNB',
      'ARN',
      'OSL',
      'CPH',
      'HEL',
      'VIE',
    ];
    return code.length === 3 && codes.includes(code);
  }
}
