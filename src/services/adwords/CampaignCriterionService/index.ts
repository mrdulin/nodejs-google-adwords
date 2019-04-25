import { pd } from 'pretty-data';

import { AdwordsOperartionService, SoapService } from '../../core';
import { ISelector, Predicate, Operator } from '../../../types/adwords';
import { ICampaignCriterionPage } from './CampaignCriterionPage';
import { ICampaignCriterionOperation } from './CampaignCriterionOperation';
import { ICampaignCriterionReturnValue } from './CampaignCriterionReturnValue';
import { Criterion } from './enum/Criterion';
import { INegativeCampaignCriterion, ICampaignCriterion } from './CampaignCriterion';

interface ICampaignCriterionServiceOpts {
  soapService: SoapService;
}

class CampaignCriterionService extends AdwordsOperartionService {
  private static readonly selectorFields: string[] = [
    'Address',
    'AgeRangeType',
    'AppId',
    'BaseCampaignId',
    'BidModifier',
    'CampaignCriterionStatus',
    'CampaignId',
    'CarrierCountryCode',
    'CarrierName',
    'ChannelId',
    'ChannelName',
    'ContentLabelType',
    'CriteriaType',
    'DayOfWeek',
    'DeviceName',
    'DeviceType',
    'Dimensions',
    'DisplayName',
    'DisplayType',
    'EndHour',
    'EndMinute',
    'FeedId',
    'GenderType',
    'GeoPoint',
    'Id',
    'IncomeRangeType',
    'IpAddress',
    'IsNegative',
    'KeywordMatchType',
    'KeywordText',
    'LanguageCode',
    'LanguageName',
    'LocationName',
    'ManufacturerName',
    'MatchingFunction',
    'MobileAppCategoryId',
    'OperatingSystemName',
    'OperatorType',
    'OsMajorVersion',
    'OsMinorVersion',
    'Parameter',
    'ParentLocations',
    'ParentType',
    'Path',
    'PlacementUrl',
    'PlatformName',
    'RadiusDistanceUnits',
    'RadiusInUnits',
    'StartHour',
    'StartMinute',
    'TargetingStatus',
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
    'VideoName'
  ];

  private soapService: SoapService;
  constructor(options: ICampaignCriterionServiceOpts) {
    super();
    this.soapService = options.soapService;
  }

  public async getAllByCampaignIds(campaignIds: string[]) {
    const serviceSelector: ISelector = {
      fields: CampaignCriterionService.selectorFields,
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

  public async getAllLocationCriterionByCampaignIds(campaignIds: string[]) {
    const serviceSelector: ISelector = {
      fields: CampaignCriterionService.selectorFields,
      predicates: [
        {
          field: 'CampaignId',
          operator: Predicate.Operator.IN,
          values: campaignIds
        },
        {
          field: 'CriteriaType',
          operator: Predicate.Operator.IN,
          values: [Criterion.Type.LOCATION]
        }
      ]
    };
    return this.get(serviceSelector);
  }

  /**
   * add location to campaign, location criterion id can be found here:
   * https://docs.google.com/spreadsheets/d/1FIB1WP3OHbjoe0AQ8oNuzY--NnHeuen-W7EWY6uupnA/edit#gid=1905266229
   *
   *
   * @author dulin
   * @param {ICampaignCriterion[]} campaignCriterionOperations
   * @returns
   * @memberof CampaignCriterionService
   */
  public async add(campaignCriterionOperations: ICampaignCriterion[]) {
    const opertions: ICampaignCriterionOperation[] = campaignCriterionOperations.map(
      (campaignCriterionOperation: ICampaignCriterion) => {
        const operation: ICampaignCriterionOperation = {
          operator: Operator.ADD,
          operand: campaignCriterionOperation,
          attributes: {
            'xsi:type': 'CampaignCriterionOperation'
          }
        };
        return operation;
      }
    );
    return this.mutate(opertions);
  }

  protected async mutate<Operaiton = ICampaignCriterionOperation, Rval = ICampaignCriterionReturnValue>(
    opertions: Operaiton[]
  ): Promise<Rval> {
    return this.soapService.mutateAsync<Operaiton, Rval>(opertions).then((rval: Rval) => {
      console.log('mutate campaign criterion successfully. rval: ', pd.json(rval));
      return rval;
    });
  }

  protected async get<ServiceSelector = ISelector, Rval = ICampaignCriterionPage>(
    serviceSelector: ServiceSelector
  ): Promise<Rval | undefined> {
    return this.soapService.get<ServiceSelector, Rval>(serviceSelector).then((rval: Rval | undefined) => {
      console.log('get campaign criterion successfully. rval: ', pd.json(rval));
      return rval;
    });
  }
}

export { CampaignCriterionService };
