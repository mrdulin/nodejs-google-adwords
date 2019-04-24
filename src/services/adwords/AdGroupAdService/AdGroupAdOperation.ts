import { IOperation } from '../../../types/adwords';
import { IAdGroupAd } from './AdGroupAd';
import { IExemptionRequest } from './ExemptionRequest';

export interface IAdGroupAdOperation extends IOperation {
  operand: IAdGroupAd;
  exemptionRequests: IExemptionRequest[];
  ignorablePolicyTopicIds: string[];
}
