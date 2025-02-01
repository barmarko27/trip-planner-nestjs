import {
  CityIdValueObject,
  CityNameValueObject,
  GeoValueObject,
  IataCodeValueObject,
} from '../value-objects';
import { Entity } from '@shared/domain';
interface CityEntityProps {
  iataCode: IataCodeValueObject;
  geo?: GeoValueObject;
  name?: CityNameValueObject;
  uuid?: CityIdValueObject;
}

export class CityEntity extends Entity<CityEntityProps> {
  private constructor(props: CityEntityProps) {
    super(props);
  }

  public static create(props: CityEntityProps): CityEntity {
    return new CityEntity(props);
  }

  get iataCode(): IataCodeValueObject {
    return this.props.iataCode;
  }

  get geo(): GeoValueObject | undefined {
    return this.props.geo;
  }

  get name(): CityNameValueObject | undefined {
    return this.props.name;
  }
}
