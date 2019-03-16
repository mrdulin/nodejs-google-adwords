import { CriterionUse } from './enum/CriterionUse';
import { IKeyword } from './Criterion';
import { ITextLabel } from '../CampaignService/Label';
import { UserStatus } from './enum/UserStatus';
import { SystemServingStatus } from './enum/SystemServingStatus';
import { ApprovalStatus } from './enum/ApprovalStatus';
import { IBid } from './Bid';
import { IQualityInfo } from './QualityInfo';
import { IBiddingStrategyConfiguration } from './BiddingStrategyConfiguration';
import { IUrlList } from './UrlList';
import { ICustomParameters } from './CustomParameters';

interface IAdGroupCriterionRaw {
  adGroupId: string;
  readonly criterionUse: CriterionUse;
  // TODO
  criterion: IKeyword;
  labels: ITextLabel[];

  // forwardCompatibilityMap: any;
  readonly baseCampaignId: string;
  readonly baseAdGroupId: string;
  'AdGroupCriterion.Type': string;
}

interface IAdGroupCriterion extends Partial<IAdGroupCriterionRaw> {}

interface IBiddableAdGroupCriterionRaw extends IAdGroupCriterionRaw {
  readonly systemServingStatus: SystemServingStatus;
  readonly approvalStatus: ApprovalStatus;
  readonly disapprovalReasons: string[];
  readonly firstPageCpc: IBid;
  readonly topOfPageCpc: IBid;
  readonly firstPositionCpc: IBid;
  readonly qualityInfo: IQualityInfo;
  userStatus: UserStatus;
  biddingStrategyConfiguration: IBiddingStrategyConfiguration;
  bidModifier: number;
  finalUrls: IUrlList[];
  finalMobileUrls: IUrlList[];
  finalAppUrls: IUrlList[];
  trackingUrlTemplate: string;
  finalUrlSuffix: string;
  urlCustomParameters: ICustomParameters;
}

interface IBiddableAdGroupCriterion extends Partial<IBiddableAdGroupCriterionRaw> {
  attributes: {
    'xsi:type': 'BiddableAdGroupCriterion';
  };
}

interface INegativeAdGroupCriterionRaw extends IAdGroupCriterionRaw {}

interface INegativeAdGroupCriterion extends Partial<INegativeAdGroupCriterionRaw> {
  attributes: {
    'xsi:type': 'NegativeAdGroupCriterion';
  };
}

export { IAdGroupCriterion, IBiddableAdGroupCriterion, INegativeAdGroupCriterion };
