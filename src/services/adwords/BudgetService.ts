import { pd } from 'pretty-data';

import { SoapService } from '../core';
import { ISelector } from '../../models/adwords';

interface IBudgetServiceOpts {
  soapService: SoapService;
}

class BudgetService {
  private static readonly selectorFields = [
    'Amount',
    'BudgetId',
    'BudgetName',
    'BudgetReferenceCount',
    'BudgetStatus',
    'DeliveryMethod',
    'IsBudgetExplicitlyShared'
  ];

  private soapService: SoapService;
  constructor(options: IBudgetServiceOpts) {
    this.soapService = options.soapService;
  }

  public async getAll() {
    const selector: ISelector = {
      fields: BudgetService.selectorFields
    };
    return this.get(selector);
  }

  private async get(serviceSelector: ISelector) {
    return this.soapService.get(serviceSelector).then(response => {
      console.log('get budgets successfully. response: ', pd.json(response));
      return response;
    });
  }
}

export { BudgetService };
