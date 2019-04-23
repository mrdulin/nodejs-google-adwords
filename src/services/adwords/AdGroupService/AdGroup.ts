import { AdGroupStatus } from './enum/AdGroupStatus';
import { ITargetingSetting, IExplorerAutoOptimizerSetting } from './Setting';
import { ITextLabel } from '../CampaignService/Label';
import { IBiddingStrategyConfiguration } from './BiddingStrategyConfiguration';
import { CriterionTypeGroup } from './enum/CriterionTypeGroup';
import { ICustomParameters } from './CustomParameters';
import { AdGroupType } from './enum/AdGroupType';
import { IAdGroupAdRotationMode } from './AdGroupAdRotationMode';

export interface IAdGroup {
  id: string;
  campaignId: string;
  campaignName: string;
  name: string;
  status: AdGroupStatus;
  settings: Array<ITargetingSetting | IExplorerAutoOptimizerSetting>;
  labels: ITextLabel[];
  biddingStrategyConfiguration: IBiddingStrategyConfiguration;
  contentBidCriterionTypeGroup: CriterionTypeGroup;

  readonly baseCampaignId: string;
  readonly baseAdGroupId: string;
  trackingUrlTemplate: string;
  finalUrlSuffix: string;
  urlCustomParameters: ICustomParameters;
  adGroupType: AdGroupType;
  adGroupAdRotationMode: IAdGroupAdRotationMode;

  // TODO
  // forwardCompatibilityMap
}
