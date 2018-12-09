import { IAttributes } from '../../../types/adwords';
import { GeoTargetTypeSetting } from './enum/GeoTargetTypeSetting';

interface ISetting<Type> extends IAttributes<Type> {
  'Setting.Type': string;
}

interface IGeoTargetTypeSetting extends Partial<ISetting<'GeoTargetTypeSetting'>> {
  positiveGeoTargetType: GeoTargetTypeSetting.PositiveGeoTargetType;
  negativeGeoTargetType: GeoTargetTypeSetting.NegativeGeoTargetType;
}

export { ISetting, IGeoTargetTypeSetting };
