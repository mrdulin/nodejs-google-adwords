import { ICampaign } from './Campaign';
import { IOperation } from '../../../types/adwords';

interface ICampaignOperation extends IOperation {
  operand: ICampaign;
}

export { ICampaignOperation };
