import { ICampaign } from './Campaign';

enum Operator {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  SET = 'SET'
}

interface IOperation {
  operator: Operator;
  'Operation.Type': string;
}
interface ICampaignOperation extends IOperation {
  operand: ICampaign;
}

export { ICampaignOperation };
