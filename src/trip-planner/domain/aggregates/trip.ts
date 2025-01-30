import {
  CityEntity,
  TripCostValueObject,
  TripDurationValueObject,
  TripIdValueObject,
  TripInfoEntity,
  TripTypeValueObject,
} from '@trip-planner/domain';

export interface Trip {
  uuid: TripIdValueObject;
  origin: CityEntity;
  destination: CityEntity;
  duration: TripDurationValueObject;
  type: TripTypeValueObject;
  cost: TripCostValueObject;
  info: TripInfoEntity;
}
