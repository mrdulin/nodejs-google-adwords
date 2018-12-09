import faker from 'faker';
import moment from 'moment';

import { adwordsService } from '../../initialize';
import { IPaging } from '../../../../types/adwords';
import { ICampaignLabel } from '../../../../services/adwords/CampaignService/CampaignLabel';
import {
  ICampaign,
  CampaignStatus,
  CampaignService,
  IBudget,
  AdvertisingChannelType,
} from '../../../../services/adwords/CampaignService';
import { TimeUnit, Level } from '../../../../services/adwords/CampaignService/FrequencyCap';
import { IGeoTargetTypeSetting } from '../../../../services/adwords/CampaignService/Setting';
import { GeoTargetTypeSetting } from '../../../../services/adwords/CampaignService/enum/GeoTargetTypeSetting';
import { BiddingStrategyType } from '../../../../services/adwords/CampaignService/BiddingStrategyConfiguration';

describe('CampaignService test suites', () => {
  const campaignService = adwordsService.getService('CampaignService', {
    verbose: false,
  });
  it.skip('#getAll', async () => {
    const actualValue = await campaignService.getAll();
  });

  it.skip('#getByPage', async () => {
    const paging: IPaging = {
      startIndex: 0,
      numberResults: 1,
    };
    const actualValue = await campaignService.getByPage(paging);
  });

  it.skip('#getById', async () => {
    const id = '1677467977';
    const actualValue = await campaignService.getById(id);
  });

  it.skip('#getAllEnabled', async () => {
    const actualValue = await campaignService.getAllEnabled();
  });
  it.skip('#getAllButRemoved', async () => {
    const actualValue = await campaignService.getAllButRemoved();
  });

  it.skip('#remove', async () => {
    const campaignId = '1726553725';
    const actualValue = await campaignService.remove(campaignId);
  });

  it('#add', async () => {
    const budget: IBudget = {
      budgetId: '1865779148',
    };
    const settings: IGeoTargetTypeSetting = {
      positiveGeoTargetType: GeoTargetTypeSetting.PositiveGeoTargetType.DONT_CARE,
      negativeGeoTargetType: GeoTargetTypeSetting.NegativeGeoTargetType.DONT_CARE,
      attributes: {
        'xsi:type': 'GeoTargetTypeSetting',
      },
    };
    const campaign: ICampaign = {
      name: faker.company.bs(),
      status: CampaignStatus.ENABLED,
      startDate: moment()
        .add(1, 'd')
        .format(CampaignService.dateFormat),
      endDate: moment()
        .add(2, 'd')
        .format(CampaignService.dateFormat),
      budget,
      biddingStrategyConfiguration: {
        biddingStrategyName: faker.lorem.word(),
        biddingStrategyType: BiddingStrategyType.MANUAL_CPC,
      },
      frequencyCap: {
        impressions: 10,
        timeUnit: TimeUnit.DAY,
        level: Level.CAMPAIGN,
      },
      settings,
      advertisingChannelType: AdvertisingChannelType.SEARCH,
      networkSetting: {
        targetContentNetwork: true,
        targetGoogleSearch: true,
        targetPartnerSearchNetwork: false,
        targetSearchNetwork: true,
      },
    };

    const actualValue = await campaignService.add(campaign);
  });

  it.skip('#addLabel', async () => {
    // properties order is important
    const campaignLabel: ICampaignLabel = {
      labelId: '3763644304',
      campaignId: '1677467977',
    };
    const actualValue = await campaignService.addLabel(campaignLabel);
  });
});
