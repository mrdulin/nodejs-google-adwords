import { pd } from 'pretty-data';
import _ from 'lodash';

import { SoapService, AdwordsOperartionService } from '../../core';
import { ISelector, IPaging, Predicate, Operator } from '../../../types/adwords';
import { IBudget } from './Budget';
import { IBudgetOperation } from './BudgetOperation';
import { IBudgetPage } from './BudgetPage';
import { IBudgetReturnValue } from './BudgetReturnValue';
import { Budget } from './enum/Budget';

interface IBudgetServiceOpts {
  soapService: SoapService;
}
class BudgetService extends AdwordsOperartionService {
  /**
   * Budget amounts need to be in units.  1,000,000 units = $1.00 / ¥1.00 / ...
   * Based on the selected settlement currency
   *
   * @static
   * @memberof BudgetService
   */
  public static readonly UNIT = 1000 * 1000;

  /**
   * https://developers.google.com/adwords/api/docs/appendix/selectorfields#v201809-BudgetService
   *
   * @private
   * @static
   * @type {string[]}
   * @memberof BudgetService
   */
  private static readonly selectorFields: string[] = [
    'Amount',
    'BudgetId',
    'BudgetName',
    'BudgetReferenceCount',
    'BudgetStatus',
    'DeliveryMethod',
    'IsBudgetExplicitlyShared'
  ];

  private soapService: SoapService;
  private constructor(options: IBudgetServiceOpts) {
    super();
    this.soapService = options.soapService;
  }

  public async getAll() {
    const serviceSelector: ISelector = {
      fields: BudgetService.selectorFields
    };
    return this.get(serviceSelector);
  }

  public async getByPage(paging: IPaging) {
    const defaultPaging: IPaging = {
      startIndex: 0,
      numberResults: 5
    };
    const serviceSelector: ISelector = {
      fields: BudgetService.selectorFields,
      paging: _.defaults(paging, defaultPaging)
    };
    return this.get(serviceSelector);
  }

  public async getById(id: string) {
    const serviceSelector: ISelector = {
      fields: BudgetService.selectorFields,
      predicates: [
        {
          field: 'BudgetId',
          operator: Predicate.Operator.EQUALS,
          values: [id]
        }
      ]
    };

    return this.get(serviceSelector);
  }

  public async getByIds(ids: string[]) {
    const serviceSelector: ISelector = {
      fields: BudgetService.selectorFields,
      predicates: [
        {
          field: 'BudgetId',
          operator: Predicate.Operator.IN,
          values: ids
        }
      ]
    };

    return this.get(serviceSelector);
  }

  public async add(budget: IBudget) {
    // TODO: validate budget
    const operation: IBudgetOperation = {
      operator: Operator.ADD,
      operand: budget
    };
    return this.mutate([operation]);
  }

  public async update(budget: IBudget) {
    const operation: IBudgetOperation = {
      operator: Operator.SET,
      operand: budget
    };
    return this.mutate([operation]);
  }

  protected async get<ServiceSelector = ISelector, Rval = IBudgetPage>(
    serviceSelector: ServiceSelector
  ): Promise<Rval | undefined> {
    return this.soapService.get<ServiceSelector, Rval>(serviceSelector).then((response: Rval | undefined) => {
      console.log('get budgets successfully. response: ', pd.json(response));
      return response;
    });
  }

  protected async mutate<Operation = IBudgetOperation, Response = IBudgetReturnValue>(
    operations: Operation[]
  ): Promise<Response> {
    try {
      const response = await this.soapService.mutateAsync<Operation, Response>(operations);
      console.log('mutate budget successfully. response: ', pd.json(response));
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export { BudgetService, IBudgetOperation, IBudget, Budget, IBudgetPage };
