import { ILocation } from './Criterion';
import { CampaignCriterion } from './enum/CampaignCriterion';

interface ICampaignCriterion {
  campaignId: string;
  readonly isNegative: boolean;
  //TODO
  criterion: ILocation;
  bidModifier?: number;
  campaignCriterionStatus?: CampaignCriterion.CampaignCriterionStatus;
  readonly baseCampaignId: string;
  // forwardCompatibilityMap: any;
  'CampaignCriterion.Type'?: string;
}

interface INegativeCampaignCriterion extends ICampaignCriterion {
  attributes: {
    'xsi:type': 'NegativeCampaignCriterion';
  };
}

export { INegativeCampaignCriterion, ICampaignCriterion };
