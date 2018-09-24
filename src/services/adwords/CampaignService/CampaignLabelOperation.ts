import { IOperation } from '../../../types/adwords';
import { ICampaignLabel } from './CampaignLabel';

export interface ICampaignLabelOperation extends IOperation {
  operand: ICampaignLabel;
}
