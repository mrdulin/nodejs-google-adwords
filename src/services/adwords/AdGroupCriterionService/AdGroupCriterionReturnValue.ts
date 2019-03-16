import { IListReturnValue } from './abstract/ListReturnValue';
import { INegativeAdGroupCriterion, IBiddableAdGroupCriterion } from './AdGroupCriterion';

export interface IAdGroupCriterionReturnValue extends IListReturnValue {
  value: Array<IBiddableAdGroupCriterion | INegativeAdGroupCriterion>;
  // TODO
  partialFailureErrors?: any[];
}
