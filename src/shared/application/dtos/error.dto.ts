import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Error' })
export class ErrorDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  code: number;

  @ApiProperty()
  timestamp: number;
}
