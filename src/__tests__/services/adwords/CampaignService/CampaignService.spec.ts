import faker from 'faker';
import moment from 'moment';
import { pd } from 'pretty-data';

import { adwordsService } from '../../../initialize';
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
    console.log(`actualValue: ${pd.json(actualValue)}`);
  });
  it('#getAllButRemoved', async () => {
    const actualValue = await campaignService.getAllButRemoved();
    console.log(`actualValue: ${pd.json(actualValue)}`);
  });

  it.skip('#remove', async () => {
    const campaignId = '1726553725';
    const actualValue = await campaignService.remove(campaignId);
  });

  it.skip('#add', async () => {
    const budget: IBudget = {
      budgetId: '1865779148',
    };
    const settings: IGeoTargetTypeSetting = {
      positiveGeoTargetType: GeoTargetTypeSetting.PositiveGeoTargetType.DONT_CARE,
      negativeGeoTargetType: GeoTargetTypeSetting.NegativeGeoTargetType.DONT_CARE,
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

  // TODO:
  it.skip('#add - with CpcBid', async () => {
    const budget: IBudget = {
      budgetId: '1865779148',
    };
    const settings: IGeoTargetTypeSetting = {
      positiveGeoTargetType: GeoTargetTypeSetting.PositiveGeoTargetType.DONT_CARE,
      negativeGeoTargetType: GeoTargetTypeSetting.NegativeGeoTargetType.DONT_CARE,
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
        biddingStrategyType: BiddingStrategyType.MANUAL_CPC,
        bids: [
          {
            bid: {
              microAmount: 100 * 1000,
            },
            'Bids.Type': 'CpcBid',
          },
        ],
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

  it.skip('should pause campaign correctly', async () => {
    const campaign: ICampaign = {
      id: '1677467977',
      status: CampaignStatus.PAUSED,
    };
    const actualValue = await campaignService.update(campaign);
    console.log(`actualValue: ${pd.json(actualValue)}`);
    expect(actualValue.value[0].status).toBe(CampaignStatus.PAUSED);
  });

  it.skip('should enable campaign correctly', async () => {
    const campaign: ICampaign = {
      id: '1677467977',
      status: CampaignStatus.ENABLED,
    };
    const actualValue = await campaignService.update(campaign);
    console.log(`actualValue: ${pd.json(actualValue)}`);
    expect(actualValue.value[0].status).toBe(CampaignStatus.ENABLED);
  });

  it.skip('should not update budget for campaign', async () => {
    const budgetId = '1731003510';
    const campaign: ICampaign = {
      id: '1677467977',
      budget: {
        budgetId,
        amount: {
          microAmount: 1.2 * 1000 * 1000,
        },
      },
      endDate: moment('20201230').format(CampaignService.dateFormat),
    };
    const actualValue = await campaignService.update(campaign);
    console.log(`actualValue: ${pd.json(actualValue)}`);
  });
});
