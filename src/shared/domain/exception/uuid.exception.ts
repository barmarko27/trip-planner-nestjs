import { GenericException } from './generic.exception';

export class UUIDException extends GenericException {
  constructor(message: string) {
    super(message, '[UuidException]');
  }
}
