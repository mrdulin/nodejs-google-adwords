import { IListReturnValue } from './abstract/ListReturnValue';
import { IBudget } from './Budget';
import { IApiError } from './ApiError';

export interface IBudgetReturnValue extends IListReturnValue {
  value: IBudget[];
  partialFailureErrors: IApiError[];
}
