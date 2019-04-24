import { IPage } from './abstract/Page';
import { IAdGroupAd } from './AdGroupAd';

export interface IAdGroupAdPage extends IPage {
  entries: IAdGroupAd[];
}
