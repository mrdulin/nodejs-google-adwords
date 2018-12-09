import { IOperation } from '../../../types/adwords';
import { INegativeCampaignCriterion, ICampaignCriterion } from './CampaignCriterion';

export interface ICampaignCriterionOperation extends IOperation<'CampaignCriterionOperation'> {
  operand: INegativeCampaignCriterion | ICampaignCriterion;
}
