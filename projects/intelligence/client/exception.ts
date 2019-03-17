export class IntelClientException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'IntelClientException';
  }
}
