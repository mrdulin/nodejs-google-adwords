import { IAd } from './Ad';
import { AdGroupAd } from './enum/AdGroupAd';
import { ITextLabel } from './Label';

interface IAdGroupAdRaw {
  adGroupId: string;
  ad: IAd;
  status: AdGroupAd.Status;
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
