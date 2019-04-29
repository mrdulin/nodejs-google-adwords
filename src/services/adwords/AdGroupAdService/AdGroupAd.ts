import { AdGroupAd } from './enum/AdGroupAd';
import { ITextLabel } from './Label';
import { IExpandedTextAd, IResponsiveDisplayAd } from './Ad';

interface IAdGroupAdRaw {
  adGroupId: string;
  status: AdGroupAd.Status;
  // TODO:
  ad: Partial<IExpandedTextAd | IResponsiveDisplayAd>;
  //TODO
  readonly policySummary: any;
  labels: ITextLabel[];
  readonly baseCampaignId: string;
  readonly baseAdGroupId: string;
  // TODO
  // forwardCompatibilityMap: any;
  readonly adStrengthInfo: any;
}

interface IAdGroupAd extends Partial<IAdGroupAdRaw> {}

export { IAdGroupAd };
