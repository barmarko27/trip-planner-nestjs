import { GenericException } from '@shared/domain';

export class TripDurationException extends GenericException {
  constructor(message: string) {
    super(message, '[TripDurationException]');
  }
}
