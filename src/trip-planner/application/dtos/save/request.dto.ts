import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsEnum, Length } from 'class-validator';
import { TripTypesEnum } from '../../../constants/enum';

@ApiSchema({ name: 'Save a Trip' })
export class RequestDto {
  @ApiProperty()
  @Length(3, 3)
  public origin: string;

  @ApiProperty()
  @Length(3, 3)
  public destination: string;

  @ApiProperty()
  public duration: number;

  @ApiProperty()
  public cost: number;

  @ApiProperty({ enum: TripTypesEnum })
  @IsEnum(TripTypesEnum)
  public type: string;

  @ApiProperty()
  public display_name: string;
}
