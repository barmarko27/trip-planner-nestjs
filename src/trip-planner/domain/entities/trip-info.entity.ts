import { Entity } from '@shared/domain';
import { TripInfoException } from '../exception/trip-info.exception';
interface TripInfoProps {
  title: string;
  description?: string;
}

export class TripInfoEntity extends Entity<TripInfoProps> {
  private constructor(props: TripInfoProps) {
    super(props);
  }

  public static create(props: TripInfoProps): TripInfoEntity {
    if (props.title.length === 0) {
      throw new TripInfoException('Trip title cannot be empty.');
    }
    return new TripInfoEntity(props);
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | undefined {
    return this.props.description;
  }
}
