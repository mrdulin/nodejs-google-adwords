import { IAttributes } from './Attributes';

enum Operator {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  SET = 'SET',
}

interface IOperation<Type = any> extends IAttributes<Type> {
  operator: Operator;
  'Operation.Type'?: string;
}

export { Operator, IOperation };
