import { IsEnum, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SortTripByEnum } from '../../constants/enum';

export class RequestDto {
  @ApiProperty()
  @Length(3, 3)
  public origin: string;
  @ApiProperty()
  @Length(3, 3)
  public destination: string;
  @ApiProperty({ enum: SortTripByEnum })
  @IsEnum(SortTripByEnum)
  public sort: string;
}
