import { Cities, Trips, TripsInformation } from '@trip-planner/infrastructure';
import { TripsModel } from '../../../models/trips.model';

export class ToInfraAdapter {
  static adapt(tripModel: TripsModel): Trips {
    const trip = new Trips();
    trip.id = tripModel.id;
    trip.destination = new Cities();
    trip.destination.iataCodes = [];
    trip.destination.iataCodes.push({ code: tripModel.destination });
    trip.origin = new Cities();
    trip.origin.iataCodes = [];
    trip.origin.iataCodes.push({ code: tripModel.origin });
    trip.cost = tripModel.cost;
    trip.duration = tripModel.duration;
    trip.type = tripModel.type;
    trip.information = new TripsInformation();
    trip.information.shortDescription = tripModel.display_name;
    return trip;
  }
}
