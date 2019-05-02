import { pd } from 'pretty-data';

import { AdwordsOperartionService, SoapService } from '../../core';
import { ISelector, Predicate, Operator } from '../../../types/adwords';
import { IAdGroupCriterionPage } from './AdGroupCriterionPage';
import { Criterion } from './enum/Criterion';
import { IAdGroupCriterionOperation } from './AdGroupCriterionOperation';
import { IAdGroupCriterionReturnValue } from './AdGroupCriterionReturnValue';
import { IBiddableAdGroupCriterion, INegativeAdGroupCriterion } from './AdGroupCriterion';

interface IAdGroupCriterionServiceOpts {
  soapService: SoapService;
}

class AdGroupCriterionService extends AdwordsOperartionService {
  private static readonly selectorFields: string[] = [
    'AdGroupId',
    'AgeRangeType',
    'AppId',
    'AppPaymentModelType',
    'ApprovalStatus',
    'BaseAdGroupId',
    'BaseCampaignId',
    'BidModifier',
    'BiddingStrategyId',
    'BiddingStrategyName',
    'BiddingStrategySource',
    'BiddingStrategyType',
    'CaseValue',
    'ChannelId',
    'ChannelName',
    'CpcBid',
    'CpcBidSource',
    'CpmBid',
    'CpmBidSource',
    'CriteriaCoverage',
    'CriteriaSamples',
    'CriteriaType',
    'CriterionUse',
    'CustomAffinityId',
    'CustomIntentId',
    'DisapprovalReasons',
    'DisplayName',
    'EnhancedCpcEnabled',
    'FinalAppUrls',
    'FinalMobileUrls',
    'FinalUrlSuffix',
    'FinalUrls',
    'FirstPageCpc',
    'FirstPositionCpc',
    'GenderType',
    'Id',
    'IncomeRangeType',
    'KeywordMatchType',
    'KeywordText',
    'Labels',
    'MobileAppCategoryId',
    'Parameter',
    'ParentCriterionId',
    'ParentType',
    'PartitionType',
    'Path',
    'PlacementUrl',
    'QualityScore',
    'Status',
    'SystemServingStatus',
    'TopOfPageCpc',
    'TrackingUrlTemplate',
    'UrlCustomParameters',
    'UserInterestId',
    'UserInterestName',
    'UserInterestParentId',
    'UserListEligibleForDisplay',
    'UserListEligibleForSearch',
    'UserListId',
    'UserListMembershipStatus',
    'UserListName',
    'VerticalId',
    'VerticalParentId',
    'VideoId',
    'VideoName',
  ];

  private soapService: SoapService;
  constructor(options: IAdGroupCriterionServiceOpts) {
    super();
    this.soapService = options.soapService;
  }

  public async getByAdGroupIds(adGroupIds: string[]) {
    const serviceSelector: ISelector = {
      fields: AdGroupCriterionService.selectorFields,
      predicates: [
        {
          field: 'AdGroupId',
          operator: Predicate.Operator.IN,
          values: adGroupIds,
        },
      ],
    };
    return this.get(serviceSelector);
  }

  public async getKeywordCriterionByAdGroupIds(adGroupIds: string[]) {
    const serviceSelector: ISelector = {
      fields: AdGroupCriterionService.selectorFields,
      predicates: [
        {
          field: 'AdGroupId',
          operator: Predicate.Operator.IN,
          values: adGroupIds,
        },
        {
          field: 'CriteriaType',
          operator: Predicate.Operator.EQUALS,
          values: [Criterion.Type.KEYWORD],
        },
      ],
    };
    return this.get(serviceSelector);
  }

  /**
   * add ad group criterion such as Keyword, Gender. Support partial failure
   * https://developers.google.com/adwords/api/docs/guides/partial-failure
   *
   * @author dulin
   * @param {(Array<IBiddableAdGroupCriterion | INegativeAdGroupCriterion>)} adGroupCriterions
   * @returns
   * @memberof AdGroupCriterionService
   */
  public async add(adGroupCriterions: Array<IBiddableAdGroupCriterion | INegativeAdGroupCriterion>) {
    const operaions: IAdGroupCriterionOperation[] = adGroupCriterions.map(
      (adGroupCriterion: IBiddableAdGroupCriterion | INegativeAdGroupCriterion) => {
        const adGroupCriterionOperation: IAdGroupCriterionOperation = {
          operator: Operator.ADD,
          operand: adGroupCriterion,
          attributes: {
            'xsi:type': 'AdGroupCriterionOperation',
          },
        };
        return adGroupCriterionOperation;
      },
    );
    return this.mutate(operaions);
  }

  protected async get<ServiceSelector = ISelector, Rval = IAdGroupCriterionPage>(
    serviceSelector: ServiceSelector,
  ): Promise<Rval | undefined> {
    return this.soapService.get<ServiceSelector, Rval>(serviceSelector).then((rval: Rval | undefined) => {
      console.log('get ad group criterion successfully. rval: ', pd.json(rval));
      return rval;
    });
  }

  protected async mutate<Operation = IAdGroupCriterionOperation, Rval = IAdGroupCriterionReturnValue>(
    operaions: Operation[],
  ): Promise<Rval | undefined> {
    return this.soapService.mutateAsync<Operation, Rval>(operaions).then((rval: Rval) => {
      console.log('mutate ad group criterion successfully. rval: ', pd.json(rval));
      return rval;
    });
  }
}

export {
  AdGroupCriterionService,
  IAdGroupCriterionPage,
  Criterion,
  IAdGroupCriterionOperation,
  IAdGroupCriterionReturnValue,
  IBiddableAdGroupCriterion,
  INegativeAdGroupCriterion,
};
