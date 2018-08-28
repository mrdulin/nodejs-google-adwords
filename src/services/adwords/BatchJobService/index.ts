import { pd } from 'pretty-data';

import { AdwordsOperartionService, SoapService } from '../../core';
import { ISelector } from '../../../types/adwords';
import { IBatchJobPage } from './BatchJobPage';

class BatchJobService extends AdwordsOperartionService {
  /**
   * https://developers.google.com/adwords/api/docs/appendix/selectorfields#v201809-BatchJobService
   *
   * @private
   * @static
   * @type {string[]}
   * @memberof BatchJobService
   */
  private static readonly selectFields: string[] = ['DownloadUrl', 'Id', 'ProcessingErrors', 'ProgressStats', 'Status'];

  private soapService: SoapService;
  constructor(options: { soapService: SoapService }) {
    super();
    this.soapService = options.soapService;
  }

  public async getAll() {
    const serviceSelector: ISelector = {
      fields: BatchJobService.selectFields,
    };
    return this.get(serviceSelector);
  }

  protected async get<ServiceSelector = ISelector, Rval = IBatchJobPage>(
    serviceSelector: ServiceSelector,
  ): Promise<Rval | undefined> {
    return this.soapService.get<ServiceSelector, Rval>(serviceSelector).then((rval) => {
      console.log('get campaigns successfully. rval: ', pd.json(rval));
      return rval;
    });
  }
}

export { BatchJobService };
