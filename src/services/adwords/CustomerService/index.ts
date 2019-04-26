import _ from 'lodash';
import { pd } from 'pretty-data';
import { AdwordsOperartionService, SoapService, IResponse } from '../../core';
import { ICustomer } from './Customer';

interface ICustomerServiceOpts {
  soapService: SoapService;
}

/**
 * https://developers.google.com/adwords/api/docs/reference/v201809/CustomerService
 *
 * @author dulin
 * @class CustomerService
 * @extends {AdwordsOperartionService}
 */
class CustomerService extends AdwordsOperartionService {
  public static readonly namespace = 'https://adwords.google.com/api/adwords/mcm';
  /**
   * https://developers.google.com/adwords/api/docs/appendix/selectorfields#v201809-CustomerService
   *
   * @private
   * @static
   * @type {string[]}
   * @memberof CustomerService
   */
  private static readonly selectorFields: string[] = ['ServiceType'];
  private soapService: SoapService;
  constructor(opts: ICustomerServiceOpts) {
    super();
    this.soapService = opts.soapService;
  }

  public async getCustomers() {
    return this.soapService
      .getClient()
      .then((client) => client.getCustomersAsync())
      .then(this.parseResponse)
      .then((rval) => {
        console.log('get customers successfully. rval: ', pd.json(rval));
        return rval;
      });
  }

  private parseResponse(response: IResponse<ICustomer[]>): ICustomer[] {
    return _.get(response, [0, 'rval'], []);
  }
}

export { CustomerService };
