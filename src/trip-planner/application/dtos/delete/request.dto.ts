import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Delete trip' })
export class RequestDto {
  @ApiProperty()
  public id: string;
}
