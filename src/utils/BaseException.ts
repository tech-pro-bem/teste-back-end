export class BaseException extends Error {
  constructor(
    public name: string,
    public message: string,
    public statusCode: number = 400
  ) {
    super();
  }

  toString() {
    return `${this.name} - ${this.message}`;
  }
}
