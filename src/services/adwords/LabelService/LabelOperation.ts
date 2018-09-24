import { IOperation } from '../../../types/adwords';
import { ITextLabel } from './Label';

export interface ILabelOperation extends IOperation {
  operand: ITextLabel;
}
