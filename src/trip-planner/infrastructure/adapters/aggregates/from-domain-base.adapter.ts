import { Cities, Iata } from '@trip-planner/infrastructure';

export abstract class FromDomainBaseAdapter {
  protected static buildCity(iataCode: string): Cities {
    const city = new Cities();
    city.iataCodes = [];
    const iata = new Iata();
    iata.code = iataCode;
    iata.city = city;
    city.iataCodes.push(iata);
    return city;
  }
}
