import { TinyTypeOf } from 'tiny-types';
import { randomUUID } from 'crypto';
import { UUIDException } from '../exception';

export class UUIDValueObject extends TinyTypeOf<string>() {
  protected constructor(value: string) {
    super(value);
  }

  /**
   * Creates a new UUID.
   * @param value
   */
  public static create(value: string): UUIDValueObject {
    if (!UUIDValueObject.isValid(value)) {
      throw new UUIDException('UUID is not valid.');
    }
    return new UUIDValueObject(value);
  }

  /**
   * Generates a new UUID.
   */
  public static generate(): UUIDValueObject {
    return UUIDValueObject.create(randomUUID());
  }

  /**
   * Checks if the UUID is valid.
   * @param value
   */
  protected static isValid(value: string): boolean {
    return (
      value.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      ) !== null
    );
  }

  toString(): string {
    return this.value;
  }
}
