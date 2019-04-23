import { IPage } from './abstract/Page';
import { IBudget } from './Budget';

export interface IBudgetPage extends IPage {
  entries: IBudget[];
}
