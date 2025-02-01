import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Find Trips' })
export class RequestDto {
  @ApiProperty({
    required: false,
  })
  public page?: number;

  @ApiProperty({
    required: false,
  })
  public limit?: number;
}
