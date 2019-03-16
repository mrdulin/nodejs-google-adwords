import { IOperation } from '../../../types/adwords';
import { IBiddableAdGroupCriterion, INegativeAdGroupCriterion } from './AdGroupCriterion';

export interface IAdGroupCriterionOperation extends IOperation {
  operand: IBiddableAdGroupCriterion | INegativeAdGroupCriterion;
  // TODO:
  exemptionRequests?: any[];
  attributes?: {
    'xsi:type': 'AdGroupCriterionOperation';
  };
}
