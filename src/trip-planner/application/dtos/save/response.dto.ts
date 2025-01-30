import { TripsDto } from '../trips.dto';
import { ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Saved Trip' })
export class ResponseDto extends TripsDto {}
