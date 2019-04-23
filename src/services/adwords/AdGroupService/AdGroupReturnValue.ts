import { IListReturnValue } from './abstract/ListReturnValue';
import { IAdGroup } from './AdGroup';

export interface IAdGroupReturnValue extends IListReturnValue {
  value: IAdGroup[];
  // TODO
  partialFailureErrors?: any[];
}
