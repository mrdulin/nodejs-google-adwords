import { IPage } from './abstract/Page';
import { IBatchJob } from './BatchJob';

export interface IBatchJobPage extends IPage {
  entries: IBatchJob[];
  attributes: {
    'xsi:type': 'BatchJobPage';
  };
}
