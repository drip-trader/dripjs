export class IntelServiceException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'IntelServiceException';
  }
}
