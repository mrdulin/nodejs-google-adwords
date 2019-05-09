import { IBudget } from './Budget';
import { INetworkSetting } from './NetworkSetting';
import { ITextLabel } from './Label';
import { IFrequencyCap } from './FrequencyCap';
import { IConversionOptimizerEligibility } from './ConversionOptimizerEligibility';
import { IGeoTargetTypeSetting } from './Setting';
import { IBiddingStrategyConfiguration } from './BiddingStrategyConfiguration';
import { CampaignStatus } from './enum/CampaignStatus';
import { ServingStatus } from './enum/ServingStatus';
import { AdServingOptimizationStatus } from './enum/AdServingOptimizationStatus';
import { AdvertisingChannelSubType } from './enum/AdvertisingChannelSubType';
import { AdvertisingChannelType } from './enum/AdvertisingChannelType';
import { CampaignTrialType } from './enum/CampaignTrialType';
import { IStringStringMapEntry } from './String_StringMapEntry';
import { ICustomParameters } from './CustomParameters';

interface ICampaignRaw {
  readonly id: string;
  campaignGroupId: string;
  name: string;
  status: CampaignStatus;
  servingStatus: ServingStatus;
  startDate: string;
  endDate: string;
  budget: IBudget;
  readonly conversionOptimizerEligibility: IConversionOptimizerEligibility;
  adServingOptimizationStatus: AdServingOptimizationStatus;
  frequencyCap: IFrequencyCap;
  // TODO: add more settings
  settings: IGeoTargetTypeSetting;
  advertisingChannelType: AdvertisingChannelType;
  advertisingChannelSubType: AdvertisingChannelSubType;
  networkSetting: INetworkSetting;
  labels: ITextLabel[];
  biddingStrategyConfiguration: IBiddingStrategyConfiguration;
  readonly campaignTrialType: CampaignTrialType;
  readonly baseCampaignId: string;
  forwardCompatibilityMap: IStringStringMapEntry[];
  trackingUrlTemplate: string;
  finalUrlSuffix: string;
  urlCustomParameters: ICustomParameters;

  // TODO: add types
  vanityPharma: any;
  universalAppCampaignInfo: any;
  selectiveOptimization: any;
}

interface ICampaign extends Partial<ICampaignRaw> {}

export { ICampaign };
