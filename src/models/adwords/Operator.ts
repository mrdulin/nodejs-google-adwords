enum Operator {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  SET = 'SET'
}

interface IOperation {
  operator: Operator;
  'Operation.Type'?: string;
}

export { Operator, IOperation };
