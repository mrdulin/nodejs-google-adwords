import { Criterion } from './enum/Criterion';
import { LocationTargetingStatus } from './enum/LocationTargetingStatus';

interface ICriterionRaw {
  id: string;
  readonly type: Criterion.Type;
  'Criterion.Type': string;
}

interface ICriterion extends Partial<ICriterionRaw> {}

interface ILocationRaw extends ICriterionRaw {
  readonly locationName: string;
  readonly displayType: string;
  readonly targetingStatus: LocationTargetingStatus;
  readonly parentLocations: ILocation[];
}

interface ILocation extends Partial<ILocationRaw> {
  attributes: {
    'xsi:type': 'Location';
  };
}

export { ILocation };
