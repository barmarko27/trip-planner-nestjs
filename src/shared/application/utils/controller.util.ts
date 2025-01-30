import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ErrorDto } from '../dtos/error.dto';
import { ApiResponseOptions } from '@nestjs/swagger';
import { ApiResponseCommonMetadata } from '@nestjs/swagger/dist/decorators/api-response.decorator';

export const validationPipe = new ValidationPipe({
  transform: true,
  transformOptions: { enableImplicitConversion: true },
  forbidNonWhitelisted: true,
});

export const buildFailRestResponse = (
  ko: Pick<ApiResponseCommonMetadata, 'description'>,
) => {
  const koResponse: ApiResponseCommonMetadata = {
    description: ko.description,
    type: ErrorDto,
    status: HttpStatus.BAD_REQUEST,
  };
  return koResponse as ApiResponseOptions;
};
