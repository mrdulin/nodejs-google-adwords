import { ICampaign } from './Campaign';
import { IOperation } from '../../../models/adwords';

interface ICampaignOperation extends IOperation {
  operand: ICampaign;
}

export { ICampaignOperation };
