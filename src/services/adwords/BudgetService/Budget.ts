import { IMoney } from './Money';
import { Budget } from './enum/Budget';

export interface IBudget {
  budgetId?: string;
  name?: string;
  amount?: IMoney;
  deliveryMethod?: Budget.BudgetDeliveryMethod;
  referenceCount?: number;
  isExplicitlyShared?: boolean;
  status?: Budget.BudgetStatus;
}
