import { pd } from 'pretty-data';
import { SoapService } from '../core';
import { ISelector } from '../../types/adwords';
import { AdwordsOperartionService } from '../core/AdwordsOperationService';

interface IAdGroupServiceOpts {
  soapService: SoapService;
}
class AdGroupService extends AdwordsOperartionService {
  /**
   * https://developers.google.com/adwords/api/docs/appendix/selectorfields?hl=zh-cn#v201809-AdGroupService
   *
   * @private
   * @static
   * @memberof AdGroupService
   */
  private static readonly selectorFields = [
    'AdGroupType',
    'AdRotationMode',
    'BaseAdGroupId',
    'BaseCampaignId',
    'BiddingStrategyId',
    'BiddingStrategyName',
    'BiddingStrategySource',
    'BiddingStrategyType',
    'CampaignId',
    'CampaignName',
    'ContentBidCriterionTypeGroup',
    'CpcBid',
    'CpmBid',
    'EnhancedCpcEnabled',
    'FinalUrlSuffix',
    'Id',
    'Labels',
    'Name',
    'Settings',
    'Status',
    'TargetCpa',
    'TargetCpaBid',
    'TargetCpaBidSource',
    'TargetRoasOverride',
    'TrackingUrlTemplate',
    'UrlCustomParameters'
  ];

  private soapService: SoapService;
  private constructor(options: IAdGroupServiceOpts) {
    super();
    this.soapService = options.soapService;
  }

  public async getAll() {
    const serviceSelector: ISelector = {
      fields: AdGroupService.selectorFields
    };
    return this.get(serviceSelector);
  }

  protected async get<ServiceSelector = ISelector, Response = any>(serviceSelector: ServiceSelector) {
    return this.soapService.get<ServiceSelector, Response>(serviceSelector).then(response => {
      console.log('get Ad Group successfully. response: ', pd.json(response));
      return response;
    });
  }
}

export { AdGroupService, IAdGroupServiceOpts };
