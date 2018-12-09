import { pd } from 'pretty-data';
import _ from 'lodash';

import { SoapService } from '../../core';
import { ISelector, IPaging, Operator } from '../../../types/adwords';
import { AdwordsOperartionService } from '../../core/AdwordsOperationService';
import { ICampaignOperation } from './CampaignOperation';
import { ICampaignReturnValue } from './CampaignReturnValue';
import { ICampaignPage } from './CampaignPage';
import { ICampaign } from './Campaign';
import { Predicate } from './enum/Predicate';
import { CampaignStatus } from './enum/CampaignStatus';
import { ServingStatus } from './enum/ServingStatus';
import { ICampaignLabelOperation } from './CampaignLabelOperation';
import { ICampaignLabelReturnValue } from './CampaignLabelReturnValue';
import { ICampaignLabel } from './CampaignLabel';

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
  public static readonly dateFormat: string = 'YYYYMMDD';
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
    'ViewableCpmEnabled',
  ];

  private soapService: SoapService;
  constructor(options: ICampaignServiceOpts) {
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
          values: [CampaignStatus.ENABLED, CampaignStatus.PAUSED, CampaignStatus.REMOVED],
        },
      ],
    };
    return this.get(serviceSelector);
  }

  public async getByPage(paging: IPaging) {
    const defaultPaging: IPaging = {
      startIndex: 0,
      numberResults: 5,
    };
    const serviceSelector: ISelector = {
      fields: CampaignService.selectorFields,
      paging: _.defaults(paging, defaultPaging),
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
          values: [id],
        },
      ],
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
          values: [ServingStatus.SERVING],
        },
      ],
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
          values: [CampaignStatus.REMOVED],
        },
      ],
    };
    return this.get(serviceSelector);
  }

  public async add(campaign: ICampaign) {
    const operations: ICampaignOperation[] = [
      {
        operator: Operator.ADD,
        operand: campaign,
        attributes: {
          'xsi:type': 'CampaignOperation',
        },
      },
    ];
    return this.mutate(operations);
  }

  public async update(campaign: ICampaign) {
    // TODO: validate campaign
    const operation: ICampaignOperation[] = [
      {
        operator: Operator.SET,
        operand: campaign,
      },
    ];
    return this.mutate(operation);
  }

  public async remove(campaignId: string) {
    const campaign: ICampaign = {
      id: campaignId,
      status: CampaignStatus.REMOVED,
    };
    const operations: ICampaignOperation[] = [
      {
        operator: Operator.SET,
        operand: campaign,
      },
    ];
    return this.mutate(operations);
  }

  public async addLabel(campaignLabel: ICampaignLabel) {
    // TODO: validate campaignLabel
    const operations: ICampaignLabelOperation[] = [
      {
        operator: Operator.ADD,
        operand: campaignLabel,
      },
    ];
    return this.mutateLabelAsync(operations);
  }

  protected async mutateLabelAsync<Operation = ICampaignLabelOperation, Rval = ICampaignLabelReturnValue>(
    operations: Operation[],
  ) {
    return this.soapService.mutateLabelAsync<Operation, Rval>(operations).then((rval: Rval | undefined) => {
      console.log('mutate label for campaign successfully. rval: ', rval);
      return rval;
    });
  }

  protected async mutate<Operation = ICampaignOperation, Rval = ICampaignReturnValue>(
    operations: Operation[],
  ): Promise<Rval> {
    try {
      const rval = await this.soapService.mutateAsync<Operation, Rval>(operations);
      console.log('mutate campaign successfully. rval: ', pd.json(rval));
      return rval;
    } catch (error) {
      throw error;
    }
  }

  protected async get<ServiceSelector = ISelector, Rval = ICampaignPage>(
    serviceSelector: ServiceSelector,
  ): Promise<Rval | undefined> {
    return this.soapService.get<ServiceSelector, Rval>(serviceSelector).then((rval) => {
      console.log('get campaigns successfully. rval: ', pd.json(rval));
      return rval;
    });
  }
}

export { CampaignService, ICampaignServiceOpts };
export * from './Budget';
export * from './Campaign';
export * from './CampaignPage';
export * from './CampaignOperation';
export * from './CampaignReturnValue';
export * from './enum/CampaignStatus';
export * from './enum/AdvertisingChannelType';
export * from './enum/BidSource';
export * from './enum/ServingStatus';
