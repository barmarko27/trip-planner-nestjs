import { IsEnum, Length } from 'class-validator';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { TripTypesEnum } from '../../constants/enum';

@ApiSchema({ name: 'Trip' })
export class TripsDto {
  @ApiProperty()
  public id: string;

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

  @ApiProperty()
  @IsEnum(TripTypesEnum)
  public type: string;

  @ApiProperty()
  public display_name: string;
}
