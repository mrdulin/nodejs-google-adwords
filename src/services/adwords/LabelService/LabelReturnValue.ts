import { IListReturnValue } from './abstract/ListReturnValue';
import { ITextLabel } from './Label';

export interface ILabelReturnValue extends IListReturnValue {
  value: ITextLabel[];
}
