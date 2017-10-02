import { CriterionUse } from './enum/CriterionUse';
import { IKeyword, IGender, IAgeRange } from './Criterion';
import { ITextLabel } from '../CampaignService/Label';
import { UserStatus } from './enum/UserStatus';
import { SystemServingStatus } from './enum/SystemServingStatus';
import { ApprovalStatus } from './enum/ApprovalStatus';
import { IBid } from './Bid';
import { IQualityInfo } from './QualityInfo';
import { IBiddingStrategyConfiguration } from './BiddingStrategyConfiguration';
import { IUrlList } from './UrlList';
import { ICustomParameters } from './CustomParameters';
import { IAttributes } from '../../../types/adwords';

interface IAdGroupCriterion<Type> extends IAttributes<Type> {
  adGroupId: string;
  readonly criterionUse: CriterionUse;
  // TODO
  criterion: IKeyword | IGender | IAgeRange;
  labels: ITextLabel[];

  // forwardCompatibilityMap: any;
  readonly baseCampaignId: string;
  readonly baseAdGroupId: string;
  'AdGroupCriterion.Type': string;
}

interface IBiddableAdGroupCriterionRaw<Type> extends IAdGroupCriterion<Type> {
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

interface IBiddableAdGroupCriterion extends Partial<IBiddableAdGroupCriterionRaw<'BiddableAdGroupCriterion'>> {}
interface INegativeAdGroupCriterionRaw<Type> extends IAdGroupCriterion<Type> {}
interface INegativeAdGroupCriterion extends Partial<INegativeAdGroupCriterionRaw<'NegativeAdGroupCriterion'>> {}

export { IBiddableAdGroupCriterion, INegativeAdGroupCriterion };
