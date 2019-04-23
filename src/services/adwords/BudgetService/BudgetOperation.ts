import { IOperation } from '../../../types/adwords';
import { IBudget } from './Budget';

export interface IBudgetOperation extends IOperation {
  operand: IBudget;
}
