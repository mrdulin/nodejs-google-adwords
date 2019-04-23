import { pd } from 'pretty-data';
import _ from 'lodash';

import { SoapService } from '../core';
import { ISelector, IPaging, Predicate, IOperation, Operator } from '../../models/adwords';
import { AdwordsOperartionService } from '../core/AdwordsOperationService';

interface IFieldPathElement {
  field: string;
  index: number;
}

interface IApiError {
  fieldPath: string;
  fieldPathElements: IFieldPathElement;
  trigger: string;
  errorString: string;
  'ApiError.Type'?: string;
}

interface IListReturnValue {
  'ListReturnValue.Type'?: string;
}
interface IPage {
  totalNumEntries: number;
  'Page.Type'?: string;
}
interface IBudgetPage extends IPage {
  entries: IBudget[];
}

interface IBudgetReturnValue extends IListReturnValue {
  value: IBudget[];
  partialFailureErrors: IApiError[];
}

namespace Budget {
  export enum BudgetDeliveryMethod {
    STANDARD = 'STANDARD',
    ACCELERATED = 'ACCELERATED',
    UNKNOWN = 'UNKNOWN'
  }

  export enum BudgetStatus {
    ENABLED = 'ENABLED',
    REMOVED = 'REMOVED',
    UNKNOWN = 'UNKNOWN'
  }
}
interface IComparableValue {
  'ComparableValue.Type'?: string;
}

interface IMoney extends IComparableValue {
  microAmount: number;
}

interface IBudget {
  budgetId?: string;
  name?: string;
  amount?: IMoney;
  deliveryMethod?: Budget.BudgetDeliveryMethod;
  referenceCount?: number;
  isExplicitlyShared?: boolean;
  status?: Budget.BudgetStatus;
}

interface IBudgetOperation extends IOperation {
  operand: IBudget;
}

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

  protected async get<ServiceSelector = ISelector, Response = { rval: IBudgetPage }>(
    serviceSelector: ServiceSelector
  ): Promise<Response> {
    return this.soapService.get<ServiceSelector, Response>(serviceSelector).then((response: Response) => {
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
