import { IOperation } from '../../../types/adwords';
import { INegativeCampaignCriterion } from './CampaignCriterion';

export interface ICampaignCriterionOperation extends IOperation {
  operand: INegativeCampaignCriterion;
  attributes: {
    'xsi:type': 'CampaignCriterionOperation';
  };
}
