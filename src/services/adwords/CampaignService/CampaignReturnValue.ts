import { IListReturnValue } from './abstract/ListReturnValue';
import { ICampaign } from './Campaign';
import { IApiError } from './ApiError';

export interface ICampaignReturnValue extends IListReturnValue {
  value: ICampaign[];
  partialFailureErrors?: IApiError[];
}
