import { SoapService, AdwordsOperartionService } from '../../core';
import { ISelector } from './Selector';
import { IAdGroupPage } from './AdGroupPage';
import { IAdGroupOperation } from './AdGroupOperation';
import { IAdGroupReturnValue } from './AdGroupReturnValue';
import { Predicate, Operator } from '../../../types/adwords';
import { IAdGroup } from './AdGroup';
import { ITargetingSetting, IExplorerAutoOptimizerSetting } from './Setting';

interface IAdGroupServiceOpts {
  soapService: SoapService;
}

/**
 * https://developers.google.com/adwords/api/docs/reference/v201809/AdGroupService
 *
 * @author dulin
 * @class AdGroupService
 * @extends {AdwordsOperartionService}
 */
class AdGroupService extends AdwordsOperartionService {
  public static isTargetingSetting(
    setting: ITargetingSetting | IExplorerAutoOptimizerSetting,
  ): setting is ITargetingSetting {
    return 'details' in setting;
  }

  public static isExplorerAutoOptimizerSetting(
    setting: ITargetingSetting | IExplorerAutoOptimizerSetting,
  ): setting is IExplorerAutoOptimizerSetting {
    return 'optIn' in setting;
  }
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
    'UrlCustomParameters',
  ];

  private soapService: SoapService;
  constructor(options: IAdGroupServiceOpts) {
    super();
    this.soapService = options.soapService;
  }

  public async getAll() {
    const serviceSelector: ISelector = {
      fields: AdGroupService.selectorFields,
    };
    return this.get(serviceSelector);
  }

  /**
   * get ad groups by campaign ids
   *
   * @author dulin
   * @param {string[]} campaignIds
   * @returns
   * @memberof AdGroupService
   */
  public async getAllByCampaignIds(campaignIds: string[]) {
    const serviceSelector: ISelector = {
      fields: AdGroupService.selectorFields,
      predicates: [
        {
          field: 'CampaignId',
          operator: Predicate.Operator.IN,
          values: campaignIds,
        },
      ],
    };
    return this.get(serviceSelector);
  }

  public async add(adGroup: IAdGroup) {
    const operations: IAdGroupOperation[] = [
      {
        operator: Operator.ADD,
        operand: this.setType(adGroup),
      },
    ];
    return this.mutate(operations);
  }

  protected async get<ServiceSelector = ISelector, Rval = IAdGroupPage>(serviceSelector: ServiceSelector) {
    return this.soapService.get<ServiceSelector, Rval>(serviceSelector).then((rval) => {
      return rval;
    });
  }

  protected async mutate<Operation = IAdGroupOperation, Rval = IAdGroupReturnValue>(operations: Operation[]) {
    return this.soapService.mutateAsync<Operation, Rval>(operations, 'AdGroupOperation').then((rval: Rval) => {
      return rval;
    });
  }

  private setType(operand: IAdGroup) {
    if (operand.settings && operand.settings.length) {
      operand.settings.forEach((setting: ITargetingSetting | IExplorerAutoOptimizerSetting) => {
        if (AdGroupService.isTargetingSetting(setting)) {
          setting.attributes = { 'xsi:type': 'TargetingSetting' };
        } else if (AdGroupService.isExplorerAutoOptimizerSetting(setting)) {
          setting.attributes = { 'xsi:type': 'ExplorerAutoOptimizerSetting' };
        }
      });
    }
    if (
      operand.biddingStrategyConfiguration &&
      operand.biddingStrategyConfiguration.bids &&
      operand.biddingStrategyConfiguration.bids.length
    ) {
      let { bids } = operand.biddingStrategyConfiguration;
      bids = bids.map((bid: any) => {
        bid.attributes = {
          'xsi:type': bid['Bids.Type'],
        };
        delete bid['Bids.Type'];
        return bid;
      });
      operand.biddingStrategyConfiguration.bids = bids;
    }
    return operand;
  }
}

export { AdGroupService, IAdGroupServiceOpts, IAdGroupPage, IAdGroupOperation, IAdGroupReturnValue, IAdGroup };
