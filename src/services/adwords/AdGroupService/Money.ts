import { IComparableValue } from './abstract/ComparableValue';

interface IMoney extends IComparableValue {
  microAmount: number;
}

export { IMoney };
