import { IPage } from './abstract/Page';
import { INegativeCampaignCriterion } from './CampaignCriterion';

export interface ICampaignCriterionPage extends IPage {
  entries: INegativeCampaignCriterion[];
  attibutes: {
    'xsi:type': 'CampaignCriterionPage';
  };
}
