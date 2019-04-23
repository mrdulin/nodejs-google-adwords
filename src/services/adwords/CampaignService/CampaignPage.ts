import { IPage } from './abstract/Page';
import { ICampaign } from './Campaign';

export interface ICampaignPage extends IPage {
  entries: ICampaign[];
}
