import { GenericException } from '@shared/domain';

export class IataCodeException extends GenericException {
  constructor(message: string) {
    super(message, '[IataCodeException]');
  }
}
