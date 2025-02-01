import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorDto } from '../dtos/error.dto';

@Catch()
export class ApiErrorFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus = HttpStatus.BAD_REQUEST;

    const responseBody = new ErrorDto();
    responseBody.message =
      exception instanceof Error ? exception.message : 'Internal server error';

    responseBody.timestamp = +new Date();

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
