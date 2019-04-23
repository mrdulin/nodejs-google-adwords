import { pd } from 'pretty-data';
import _ from 'lodash';

import { SoapService } from '../../core';
import { ISelector, IPaging, Operator } from '../../../models/adwords';
import { AdwordsOperartionService } from '../../core/AdwordsOperationService';
import { ICampaignOperation } from './CampaignOperation';
import { ICampaignReturnValue } from './CampaignReturnValue';
import { ICampaignPage } from './CampaignPage';
import { ICampaign } from './Campaign';
import { Predicate } from './enum/Predicate';
import { CampaignStatus } from './enum/CampaignStatus';
import { ServingStatus } from './enum/ServingStatus';

interface ICampaignServiceOpts {
  soapService: SoapService;
}

/**
 *
 * @author dulin
 * @class CampaignService
 * @extends {AdWordsService}
 */
class CampaignService extends AdwordsOperartionService {
  /**
   * https://developers.google.com/adwords/api/docs/appendix/selectorfields#v201809-CampaignService
   *
   * @private
   * @static
   * @memberof CampaignService
   */
  private static readonly selectorFields: string[] = [
    'AdServingOptimizationStatus',
    'AdvertisingChannelSubType',
    'AdvertisingChannelType',
    'Amount',
    'AppId',
    'AppVendor',
    'BaseCampaignId',
    'BiddingStrategyGoalType',
    'BiddingStrategyId',
    'BiddingStrategyName',
    'BiddingStrategyType',
    'BudgetId',
    'BudgetName',
    'BudgetReferenceCount',
    'BudgetStatus',
    'CampaignGroupId',
    'CampaignTrialType',
    'DeliveryMethod',
    'Eligible',
    'EndDate',
    'EnhancedCpcEnabled',
    'FinalUrlSuffix',
    'FrequencyCapMaxImpressions',
    'Id',
    'IsBudgetExplicitlyShared',
    'Labels',
    'Level',
    'MaximizeConversionValueTargetRoas',
    'Name',
    'RejectionReasons',
    'SelectiveOptimization',
    'ServingStatus',
    'Settings',
    'StartDate',
    'Status',
    'TargetContentNetwork',
    'TargetCpa',
    'TargetCpaMaxCpcBidCeiling',
    'TargetCpaMaxCpcBidFloor',
    'TargetGoogleSearch',
    'TargetPartnerSearchNetwork',
    'TargetRoas',
    'TargetRoasBidCeiling',
    'TargetRoasBidFloor',
    'TargetSearchNetwork',
    'TargetSpendBidCeiling',
    'TargetSpendSpendTarget',
    'TimeUnit',
    'TrackingUrlTemplate',
    'UrlCustomParameters',
    'VanityPharmaDisplayUrlMode',
    'VanityPharmaText',
    'ViewableCpmEnabled'
  ];

  private soapService: SoapService;
  private constructor(options: ICampaignServiceOpts) {
    super();
    this.soapService = options.soapService;
  }

  /**
   * get all campaigns
   *
   * @author dulin
   * @returns
   * @memberof CampaignService
   */
  public async getAll() {
    const serviceSelector: ISelector = {
      fields: CampaignService.selectorFields,
      predicates: [
        {
          field: 'Status',
          operator: Predicate.Operator.IN,
          values: [CampaignStatus.ENABLED, CampaignStatus.PAUSED, CampaignStatus.REMOVED]
        }
      ]
    };
    return this.get(serviceSelector);
  }

  public async getByPage(paging: IPaging) {
    const defaultPaging: IPaging = {
      startIndex: 0,
      numberResults: 5
    };
    const serviceSelector: ISelector = {
      fields: CampaignService.selectorFields,
      paging: _.defaults(paging, defaultPaging)
    };
    return this.get(serviceSelector);
  }

  public async getById(id: string) {
    const serviceSelector: ISelector = {
      fields: CampaignService.selectorFields,
      predicates: [
        {
          field: 'Id',
          operator: Predicate.Operator.EQUALS,
          values: [id]
        }
      ]
    };
    return this.get(serviceSelector);
  }

  /**
   * get all enabled campaigns
   *
   * @author dulin
   * @returns
   * @memberof CampaignService
   */
  public async getAllEnabled() {
    const serviceSelector: ISelector = {
      fields: CampaignService.selectorFields,
      predicates: [
        {
          field: 'ServingStatus',
          operator: Predicate.Operator.IN,
          values: [ServingStatus.SERVING]
        }
      ]
    };
    return this.get(serviceSelector);
  }

  /**
   * get all campaigns but removed
   *
   * @author dulin
   * @returns
   * @memberof CampaignService
   */
  public async getAllButRemoved() {
    const serviceSelector: ISelector = {
      fields: CampaignService.selectorFields,
      predicates: [
        {
          field: 'Status',
          operator: Predicate.Operator.NOT_IN,
          values: [CampaignStatus.REMOVED]
        }
      ]
    };
    return this.get(serviceSelector);
  }

  public async update(campaign: ICampaign) {
    // TODO: validate campaign
    const operation: ICampaignOperation[] = [
      {
        operator: Operator.SET,
        operand: campaign
      }
    ];
    return this.mutate(operation);
  }

  public async remove(campaignId: string) {
    const campaign: ICampaign = {
      id: campaignId,
      status: CampaignStatus.REMOVED
    };
    const operations: ICampaignOperation[] = [
      {
        operator: Operator.SET,
        operand: campaign
      }
    ];
    return this.mutate(operations);
  }

  protected async mutate<Operation = ICampaignOperation, Rval = ICampaignReturnValue>(
    operations: Operation[]
  ): Promise<Rval> {
    try {
      const response = await this.soapService.mutateAsync<Operation, Rval>(operations);
      console.log('mutate campaign successfully. response: ', pd.json(response));
      return response;
    } catch (error) {
      throw error;
    }
  }

  protected async get<ServiceSelector = ISelector, Rval = ICampaignPage>(
    serviceSelector: ServiceSelector
  ): Promise<Rval | undefined> {
    return this.soapService.get<ServiceSelector, Rval>(serviceSelector).then(response => {
      console.log('get campaigns successfully. response: ', pd.json(response));
      return response;
    });
  }
}

export { CampaignService, ICampaignServiceOpts };
