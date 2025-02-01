import { TripCostException } from '../exception/trip-cost.exception';

export interface TripCostValueObjectProps {
  amount: number;
  currencyCode?: string;
}

export class TripCostValueObject {
  private readonly amount: number;
  private readonly currencyCode?: string;
  private constructor(props: TripCostValueObjectProps) {
    this.currencyCode = props.currencyCode || 'USD';
    this.amount = props.amount;
  }
  /**
   * Create a new TripCostValueObject
   * @param value
   */
  public static create(value: TripCostValueObjectProps): TripCostValueObject {
    const { amount: tripCost, currencyCode } = value;
    if (tripCost < 0) {
      throw new TripCostException('Trip cost cannot be negative.');
    }
    // basic validation for currency code
    if (currencyCode && currencyCode.length !== 3) {
      throw new TripCostException('Currency must be a 3-letter code.');
    }
    return new TripCostValueObject({
      amount: tripCost,
      currencyCode: currencyCode || 'USD',
    });
  }

  value(): number {
    return this.amount;
  }

  public getCurrencyCode(): string | undefined {
    return this.currencyCode;
  }

  public toString(): string {
    return `${this.currencyCode} ${this.amount.toFixed(2)}`;
  }
}
