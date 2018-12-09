import { IOperation } from '../../../types/adwords';
import { ICampaignLabel } from './CampaignLabel';

export interface ICampaignLabelOperation extends IOperation<'CampaignLabelOperation'> {
  operand: ICampaignLabel;
}
