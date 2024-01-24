export class Exception extends Error {
  constructor(
    public statusCode: number,
    public body: {
      message: string,
      issues?: any[],
    }
  ) {
    super(body.message)
  }
}

export class NotFoundException extends Exception {
  private static statusCode = 404;
  constructor(message: string = 'Not Found') {
    super(NotFoundException.statusCode, { message });
  }
}

export class BadRequestException extends Exception {
  private static statusCode = 400;
  constructor(message: string = 'Bad Request', issues?: any[]) {
    super(BadRequestException.statusCode, { message, issues });
  }
}