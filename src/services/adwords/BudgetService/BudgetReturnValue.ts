import { IListReturnValue } from './abstract/ListReturnValue';
import { IBudget } from './Budget';

export interface IBudgetReturnValue extends IListReturnValue {
  value: IBudget[];
  partialFailureErrors: IApiError[];
}
