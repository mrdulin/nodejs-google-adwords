import { pd } from 'pretty-data';
import { SoapService } from '../core';
import { ISelector } from '../../models/adwords';

interface ICampaignServiceOpts {
  soapService: SoapService;
}

/**
 *
 * @author dulin
 * @class CampaignService
 * @extends {AdWordsService}
 */
class CampaignService {
  /**
   * https://developers.google.com/adwords/api/docs/appendix/selectorfields#v201809-CampaignService
   *
   * @private
   * @static
   * @memberof CampaignService
   */
  private static readonly selectorFields = ['Id', 'Name', 'Status'];

  private soapService: SoapService;
  constructor(options: ICampaignServiceOpts) {
    this.soapService = options.soapService;
  }

  public async getAll() {
    const serviceSelector: ISelector = this.formServiceSelector();
    return this.soapService.get<ISelector>(serviceSelector).then(response => {
      console.log('get campaigns successfully. response: ', pd.json(response));
      return response;
    });
  }

  private formServiceSelector(): ISelector {
    return {
      fields: CampaignService.selectorFields
    };
  }

  // public parseGetResponse(response) {}
}

export { CampaignService, ICampaignServiceOpts };
