import faker from 'faker';

import { adwordsService } from '../../../initialize';
import { IAdGroup } from '../../../../services/adwords/AdGroupService/AdGroup';
import { AdGroupStatus } from '../../../../services/adwords/AdGroupService/enum/AdGroupStatus';
import { AdGroupType } from '../../../../services/adwords/AdGroupService/enum/AdGroupType';
import { CriterionTypeGroup } from '../../../../services/adwords/AdGroupService/enum/CriterionTypeGroup';
import { AdRotationMode } from '../../../../services/adwords/AdGroupService/enum/AdRotationMode';
import { BiddingStrategyType } from '../../../../services/adwords/AdGroupService/BiddingStrategyConfiguration';

describe.skip('AdGroupService test suites', () => {
  const adGroupService = adwordsService.getService('AdGroupService', { verbose: false });
  it('#getAll', async () => {
    const actualValue = await adGroupService.getAll();
  });

  it.skip('#getAllByCampaignIds', async () => {
    const campaignIds = ['1677467977'];
    const actualValue = await adGroupService.getAllByCampaignIds(campaignIds);
  });

  it.skip('#add', async () => {
    const adGroup: IAdGroup = {
      campaignId: '1677467977',
      name: faker.lorem.slug(1),
      status: AdGroupStatus.ENABLED,
      adGroupType: AdGroupType.DISPLAY_STANDARD,
    };
    const actualValue = await adGroupService.add(adGroup);
  });

  it.skip('#add, with settings', async () => {
    const adGroup: IAdGroup = {
      campaignId: '1878428073',
      name: faker.lorem.slug(1),
      status: AdGroupStatus.ENABLED,
      adGroupType: AdGroupType.DISPLAY_STANDARD,
      settings: [
        {
          details: [
            {
              // order is matter
              criterionTypeGroup: CriterionTypeGroup.USER_INTEREST_AND_LIST,
              targetAll: true,
            },
          ],
        },
      ],
    };
    try {
      const actualValue = await adGroupService.add(adGroup);
    } catch (error) {
      expect(error.message).toContain('AD_GROUP_TYPE_NOT_VALID_FOR_ADVERTISING_CHANNEL_TYPE');
    }
  });

  it.skip('#add - with correct adGroupType', async () => {
    const adGroup: IAdGroup = {
      campaignId: '1878428073',
      name: faker.lorem.slug(1),
      status: AdGroupStatus.ENABLED,
      adGroupType: AdGroupType.SEARCH_STANDARD,
      settings: [
        {
          details: [
            {
              // order is matter
              criterionTypeGroup: CriterionTypeGroup.USER_INTEREST_AND_LIST,
              targetAll: true,
            },
          ],
        },
      ],
      adGroupAdRotationMode: {
        adRotationMode: AdRotationMode.OPTIMIZE,
      },
    };
    const actualValue = await adGroupService.add(adGroup);
  });

  it.skip('#add - with CpcBid', async () => {
    const adGroup: IAdGroup = {
      campaignId: '1677467977',
      name: faker.lorem.slug(1),
      status: AdGroupStatus.ENABLED,
      adGroupType: AdGroupType.DISPLAY_STANDARD,
      settings: [
        {
          details: [
            {
              // order is matter
              criterionTypeGroup: CriterionTypeGroup.USER_INTEREST_AND_LIST,
              targetAll: true,
            },
          ],
        },
      ],
      biddingStrategyConfiguration: {
        // biddingStrategyType: BiddingStrategyType.MANUAL_CPC,
        bids: [
          {
            bid: {
              microAmount: 100 * 1000,
            },
            'Bids.Type': 'CpcBid',
          },
        ],
      },
      adGroupAdRotationMode: {
        adRotationMode: AdRotationMode.OPTIMIZE,
      },
    };
    const actualValue = await adGroupService.add(adGroup);
  });

  it.skip('#add - with CpcBid search type campaign', async () => {
    const adGroup: IAdGroup = {
      campaignId: '1895039275',
      name: faker.lorem.slug(1),
      status: AdGroupStatus.ENABLED,
      adGroupType: AdGroupType.SEARCH_STANDARD,
      settings: [
        {
          details: [
            {
              // order is matter
              criterionTypeGroup: CriterionTypeGroup.USER_INTEREST_AND_LIST,
              targetAll: true,
            },
          ],
        },
      ],
      biddingStrategyConfiguration: {
        // biddingStrategyType: BiddingStrategyType.MANUAL_CPC,
        bids: [
          {
            bid: {
              microAmount: 100 * 1000,
            },
            'Bids.Type': 'CpcBid',
          },
        ],
      },
      adGroupAdRotationMode: {
        adRotationMode: AdRotationMode.OPTIMIZE,
      },
    };
    const actualValue = await adGroupService.add(adGroup);
  });
});
