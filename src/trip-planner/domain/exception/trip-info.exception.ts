import { GenericException } from '@shared/domain';

export class TripInfoException extends GenericException {
  constructor(message: string) {
    super(message, '[TripInfoException]');
  }
}
