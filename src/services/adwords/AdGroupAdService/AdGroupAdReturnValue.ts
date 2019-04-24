import { IListReturnValue } from './abstract/ListReturnValue';
import { IAdGroupAd } from './AdGroupAd';

export interface IAdGroupAdReturnValue extends IListReturnValue {
  value: IAdGroupAd[];
  // TODO
  partialFailureErrors?: any[];
}
