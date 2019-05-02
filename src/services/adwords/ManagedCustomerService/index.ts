import { pd } from 'pretty-data';

import { AdwordsOperartionService, SoapService } from '../../core';
import { ISelector } from './Selector';
import { IManagedCustomerPage } from './ManagedCustomerPage';

interface IManagedCustomerServiceOpts {
  soapService: SoapService;
}

/**
 * https://developers.google.com/adwords/api/docs/reference/v201809/ManagedCustomerService
 *
 * @author dulin
 * @class ManagedCustomerService
 * @extends {AdwordsOperartionService}
 */
class ManagedCustomerService extends AdwordsOperartionService {
  public static readonly namespace = 'https://adwords.google.com/api/adwords/mcm';

  private static readonly selectorFields: string[] = [
    'AccountLabels',
    'CanManageClients',
    'CurrencyCode',
    'CustomerId',
    'DateTimeZone',
    'Name',
    'TestAccount',
  ];

  private soapService: SoapService;
  constructor(opts: IManagedCustomerServiceOpts) {
    super();
    this.soapService = opts.soapService;
  }

  /**
   * Get the account hierarchy under the current account
   *
   * @author dulin
   * @returns
   * @memberof ManagedCustomerService
   */
  public async getAccountHierarchy() {
    const serviceSelector: ISelector = {
      fields: ManagedCustomerService.selectorFields,
    };
    return this.get(serviceSelector);
  }

  protected async get<ServiceSelector = ISelector, Rval = IManagedCustomerPage>(
    serviceSelector: ServiceSelector,
  ): Promise<Rval | undefined> {
    return this.soapService.get<ServiceSelector, Rval>(serviceSelector).then((rval: Rval | undefined) => {
      console.log('get campaign criterion successfully. rval: ', pd.json(rval));
      return rval;
    });
  }
}

export { ManagedCustomerService, IManagedCustomerPage };
