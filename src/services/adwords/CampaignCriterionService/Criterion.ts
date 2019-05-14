import { Criterion } from './enum/Criterion';
import { LocationTargetingStatus } from './enum/LocationTargetingStatus';
import { IAttributes } from '../../../types/adwords';

interface ICriterionRaw<Type> extends IAttributes<Type> {
  id: string;
  readonly type: Criterion.Type;
  'Criterion.Type': string;
}

interface ICriterion<Type> extends Partial<ICriterionRaw<Type>> {}

interface ILocationRaw extends ICriterionRaw<'Location'> {
  readonly locationName: string;
  readonly displayType: string;
  readonly targetingStatus: LocationTargetingStatus;
  readonly parentLocations: ILocation[];
}

interface ILocation extends Partial<ILocationRaw> {}

export { ILocation };
