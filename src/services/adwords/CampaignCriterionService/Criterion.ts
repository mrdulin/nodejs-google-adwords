import { Criterion } from './enum/Criterion';
import { LocationTargetingStatus } from './enum/LocationTargetingStatus';
import { IAttributes } from '../../../types/adwords';
import { IGeoPoint } from './GeoPoint';
import { Proximity } from './enum/Proximity';
import { IAddress } from './Address';

interface ICriterionRaw<Type> extends IAttributes<Type> {
  id: string;
  readonly type: Criterion.Type;
}

interface ICriterion<Type> extends Partial<ICriterionRaw<Type>> {}

interface ILocationRaw extends ICriterionRaw<'Location'> {
  readonly locationName: string;
  readonly displayType: string;
  readonly targetingStatus: LocationTargetingStatus;
  readonly parentLocations: ILocation[];
}

interface ILocation extends Partial<ILocationRaw> {
  'Criterion.Type': 'Location';
}

interface IProximityRaw extends ICriterionRaw<'Proximity'> {
  geoPoint: IGeoPoint;
  radiusDistanceUnits: Proximity.DistanceUnits;
  radiusInUnits: number;
  address: IAddress;
}

interface IProximity extends Partial<IProximityRaw> {
  'Criterion.Type': 'Proximity';
}

export { ILocation, IProximity };
