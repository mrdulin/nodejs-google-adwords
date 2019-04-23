import { IOperation } from '../../../types/adwords';
import { IAdGroup } from './AdGroup';

export interface IAdGroupOperation extends IOperation {
  operand: IAdGroup;
}
