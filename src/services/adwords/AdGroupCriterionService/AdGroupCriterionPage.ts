import { IPage } from './abstract/Page';
import { IBiddableAdGroupCriterion, INegativeAdGroupCriterion } from './AdGroupCriterion';

export interface IAdGroupCriterionPage extends IPage {
  entries: Array<IBiddableAdGroupCriterion | INegativeAdGroupCriterion>;
}
