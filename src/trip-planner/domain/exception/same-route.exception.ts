import { GenericException } from '@shared/domain';

export class SameRouteException extends GenericException {
  constructor(message: string) {
    super(message, '[SameRouteException]');
  }
}
