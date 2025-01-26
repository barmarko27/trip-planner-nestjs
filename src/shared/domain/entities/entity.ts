import { UUIDValueObject } from '@shared/domain';
import { TinyType } from 'tiny-types';

export abstract class Entity<T> extends TinyType {
  protected readonly _uuid: UUIDValueObject;
  protected readonly props: T;

  protected constructor(props: T, uuid?: UUIDValueObject) {
    super();
    this._uuid = uuid ? uuid : UUIDValueObject.generate();
    this.props = props;
  }
}
