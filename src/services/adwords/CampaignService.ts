import { pd } from 'pretty-data';
import _ from 'lodash';

import { SoapService } from '../core';
import { ISelector, PredicateOperator, IPaging } from '../../models/adwords';

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
  constructor(options: ICampaignServiceOpts) {
    this.soapService = options.soapService;
  }

  public async getAll() {
    const serviceSelector: ISelector = {
      fields: CampaignService.selectorFields
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
          operator: PredicateOperator.EQUALS,
          values: [id]
        }
      ]
    };
    return this.get(serviceSelector);
  }

  private async get(serviceSelector: ISelector) {
    return this.soapService.get<ISelector>(serviceSelector).then(response => {
      console.log('get campaigns successfully. response: ', pd.json(response));
      return response;
    });
  }

  // public parseGetResponse(response) {}
}

export { CampaignService, ICampaignServiceOpts };
