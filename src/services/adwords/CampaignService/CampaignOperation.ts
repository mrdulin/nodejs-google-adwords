import { ICampaign } from './Campaign';
import { IOperation } from '../../../types/adwords';

interface ICampaignOperation extends IOperation<'CampaignOperation'> {
  operand: ICampaign;
}

export { ICampaignOperation };
