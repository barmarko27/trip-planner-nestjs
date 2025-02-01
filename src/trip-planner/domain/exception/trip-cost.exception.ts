import { GenericException } from '@shared/domain';

export class TripCostException extends GenericException {
  constructor(message: string) {
    super(message, '[TripCostException]');
  }
}
