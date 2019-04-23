import { IPage } from './abstract/Page';
import { IAdGroup } from './AdGroup';

export interface IAdGroupPage extends IPage {
  entries: IAdGroup[];
}
