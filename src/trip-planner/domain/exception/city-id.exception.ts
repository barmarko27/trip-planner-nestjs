import { GenericException } from '@shared/domain';

export class CityIdException extends GenericException {
  constructor(message: string) {
    super(message, '[CityIdException]');
  }
}
