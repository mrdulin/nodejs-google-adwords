import { pd } from 'pretty-data';

import { AdwordsOperartionService, SoapService } from '../../core';
import { ISelector, Predicate, Operator, IAttributes } from '../../../types/adwords';
import { ICampaignCriterionPage } from './CampaignCriterionPage';
import { ICampaignCriterionOperation } from './CampaignCriterionOperation';
import { ICampaignCriterionReturnValue } from './CampaignCriterionReturnValue';
import { Criterion } from './enum/Criterion';
import { ICampaignCriterion } from './CampaignCriterion';
import { ILocation, IProximity } from './Criterion';

interface ICampaignCriterionServiceOpts {
  soapService: SoapService;
}

class CampaignCriterionService extends AdwordsOperartionService {
  public static setType(campaignCriterion: ICampaignCriterion) {
    if (campaignCriterion.criterion) {
      if (CampaignCriterionService.isLocation(campaignCriterion.criterion)) {
        campaignCriterion.criterion.attributes = { 'xsi:type': 'Location' };
      } else if (CampaignCriterionService.isProximity(campaignCriterion.criterion)) {
        campaignCriterion.criterion.attributes = { 'xsi:type': 'Proximity' };
      }
    }
    return campaignCriterion;
  }
  public static isProximity(criterion: ILocation | IProximity): criterion is IProximity {
    return criterion['Criterion.Type'] === 'Proximity';
  }
  public static isLocation(criterion: ILocation | IProximity): criterion is ILocation {
    return criterion['Criterion.Type'] === 'Location';
  }
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
    'VideoName',
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
          values: campaignIds,
        },
      ],
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
          values: campaignIds,
        },
        {
          field: 'CriteriaType',
          operator: Predicate.Operator.IN,
          values: [Criterion.Type.LOCATION],
        },
      ],
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
      (campaignCriterion: ICampaignCriterion) => {
        const operation: ICampaignCriterionOperation = {
          operator: Operator.ADD,
          operand: CampaignCriterionService.setType(campaignCriterion),
        };
        return operation;
      },
    );
    return this.mutate(opertions);
  }

  protected async mutate<Operaiton = ICampaignCriterionOperation, Rval = ICampaignCriterionReturnValue>(
    opertions: Operaiton[],
  ): Promise<Rval> {
    return this.soapService.mutateAsync<Operaiton, Rval>(opertions, 'CampaignCriterionOperation').then((rval: Rval) => {
      return rval;
    });
  }

  protected async get<ServiceSelector = ISelector, Rval = ICampaignCriterionPage>(
    serviceSelector: ServiceSelector,
  ): Promise<Rval | undefined> {
    return this.soapService.get<ServiceSelector, Rval>(serviceSelector).then((rval: Rval | undefined) => {
      return rval;
    });
  }
}

export {
  CampaignCriterionService,
  ICampaignCriterion,
  ICampaignCriterionPage,
  ICampaignCriterionOperation,
  ICampaignCriterionReturnValue,
  Criterion,
};
export * from './Address';
export * from './enum/CampaignCriterion';
export * from './enum/Criterion';
export * from './enum/LocationTargetingStatus';
export * from './enum/Proximity';
export * from './GeoPoint';
