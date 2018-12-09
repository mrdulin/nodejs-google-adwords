import { IOperation } from '../../../types/adwords';
import { IBiddableAdGroupCriterion, INegativeAdGroupCriterion } from './AdGroupCriterion';

export interface IAdGroupCriterionOperation extends IOperation<'AdGroupCriterionOperation'> {
  operand: IBiddableAdGroupCriterion | INegativeAdGroupCriterion;
  // TODO:
  exemptionRequests?: any[];
}
