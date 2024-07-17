export class BaseError extends Error {
  constructor(
    public readonly message: string,
    public readonly code: number = 500,
  ) {
    super(message);
    this.code = code;
  }
}
