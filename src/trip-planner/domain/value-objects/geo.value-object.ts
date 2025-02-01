export interface GeoValueObjectProps {
  latitude: number;
  longitude: number;
}

export class GeoValueObject {
  private readonly _latitude: number;
  private readonly _longitude: number;
  private constructor(props: GeoValueObjectProps) {
    this._latitude = props.latitude;
    this._longitude = props.longitude;
  }
  /**
   * Create a new GeoValueObject
   * @param props
   */
  public static create(props: GeoValueObjectProps): GeoValueObject {
    return new GeoValueObject(props);
  }

  get latitude(): number {
    return this._latitude;
  }

  get longitude(): number {
    return this._longitude;
  }
}
