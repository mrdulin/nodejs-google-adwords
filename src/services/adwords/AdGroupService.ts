import { pd } from 'pretty-data';
import { SoapService } from '../core';
import { ISelector } from '../../models/adwords';

interface IAdGroupServiceOpts {
  soapService: SoapService;
}
class AdGroupService {
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
  constructor(options: IAdGroupServiceOpts) {
    this.soapService = options.soapService;
  }

  public async getAll() {
    const serviceSelector: ISelector = this.formServiceSelector();
    return this.soapService.get(serviceSelector).then(response => {
      console.log('get Ad Group successfully. response: ', pd.json(response));
      return response;
    });
  }

  private formServiceSelector(): ISelector {
    return {
      fields: AdGroupService.selectorFields
    };
  }
}

export { AdGroupService, IAdGroupServiceOpts };
