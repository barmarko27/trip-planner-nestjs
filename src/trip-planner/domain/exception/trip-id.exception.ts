import { GenericException } from '@shared/domain';

export class TripIdException extends GenericException {
  constructor(message: string) {
    super(message, '[TripIdException]');
  }
}
