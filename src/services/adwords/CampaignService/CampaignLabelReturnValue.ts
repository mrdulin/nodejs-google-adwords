import { IListReturnValue } from './abstract/ListReturnValue';
import { ICampaignLabel } from './CampaignLabel';
import { IApiError } from './ApiError';

export interface ICampaignLabelReturnValue extends IListReturnValue {
  value: ICampaignLabel[];
  partialFailureErrors?: IApiError[];
}
