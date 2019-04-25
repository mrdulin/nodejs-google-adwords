import { IOperation } from '../../../types/adwords';
import { INegativeCampaignCriterion, ICampaignCriterion } from './CampaignCriterion';

export interface ICampaignCriterionOperation extends IOperation {
  operand: INegativeCampaignCriterion | ICampaignCriterion;
  attributes: {
    'xsi:type': 'CampaignCriterionOperation';
  };
}
