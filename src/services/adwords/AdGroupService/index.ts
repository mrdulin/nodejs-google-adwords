import { pd } from 'pretty-data';
import { SoapService, AdwordsOperartionService } from '../../core';
import { ISelector } from './Selector';
import { IAdGroupPage } from './AdGroupPage';
import { IAdGroupOperation } from './AdGroupOperation';
import { IAdGroupReturnValue } from './AdGroupReturnValue';
import { Predicate, Operator } from '../../../types/adwords';
import { IAdGroup } from './AdGroup';

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
  constructor(options: IAdGroupServiceOpts) {
    super();
    this.soapService = options.soapService;
  }

  public async getAll() {
    const serviceSelector: ISelector = {
      fields: AdGroupService.selectorFields
    };
    return this.get(serviceSelector);
  }

  public async getAllByCampaignIds(campaignIds: string[]) {
    const serviceSelector: ISelector = {
      fields: AdGroupService.selectorFields,
      predicates: [
        {
          field: 'CampaignId',
          operator: Predicate.Operator.IN,
          values: campaignIds
        }
      ]
    };
    return this.get(serviceSelector);
  }

  public async add(adGroup: IAdGroup) {
    const operations: IAdGroupOperation[] = [
      {
        operator: Operator.ADD,
        operand: adGroup
      }
    ];
    return this.mutate(operations);
  }

  protected async get<ServiceSelector = ISelector, Rval = IAdGroupPage>(serviceSelector: ServiceSelector) {
    return this.soapService.get<ServiceSelector, Rval>(serviceSelector).then(rval => {
      console.log('get Ad Group successfully. rval: ', pd.json(rval));
      return rval;
    });
  }

  protected async mutate<Operation = IAdGroupOperation, Rval = IAdGroupReturnValue>(operations: Operation[]) {
    return this.soapService.mutateAsync<Operation, Rval>(operations).then((rval: Rval) => {
      console.log('mutate Ad group successfully. rval: ', pd.json(rval));
      return rval;
    });
  }
}

export { AdGroupService, IAdGroupServiceOpts };
