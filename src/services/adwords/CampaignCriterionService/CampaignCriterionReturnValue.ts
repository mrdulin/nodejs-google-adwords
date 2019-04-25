import { IListReturnValue } from './abstract/ListReturnValue';
import { INegativeCampaignCriterion } from './CampaignCriterion';

export interface ICampaignCriterionReturnValue extends IListReturnValue {
  value: INegativeCampaignCriterion[];
  partialFailureErrors?: any[];
  attibutes: {
    'xsi:type': 'CampaignCriterionReturnValue';
  };
}
