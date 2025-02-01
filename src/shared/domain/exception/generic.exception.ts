export class GenericException extends Error {
  protected baseErrorMessage = '[GenericException]';
  constructor(message: string, errorName: string = '[GenericException]') {
    super(errorName + ': ' + message);
  }
}
