import faker from 'faker';

import { adwordsService } from '../../initialize';
import { IAdGroup } from '../../../../services/adwords/AdGroupService/AdGroup';
import { AdGroupStatus } from '../../../../services/adwords/AdGroupService/enum/AdGroupStatus';
import { AdGroupType } from '../../../../services/adwords/AdGroupService/enum/AdGroupType';

describe('AdGroupService test suites', () => {
  const adGroupService = adwordsService.getService('AdGroupService');
  it.skip('#getAll', async () => {
    const actualValue = await adGroupService.getAll();
  });

  it('#getAllByCampaignIds', async () => {
    const campaignIds = ['1677467977'];
    const actualValue = await adGroupService.getAllByCampaignIds(campaignIds);
  });

  it.skip('#add', async () => {
    const adGroup: IAdGroup = {
      campaignId: '1677467977',
      name: faker.lorem.slug(1),
      status: AdGroupStatus.ENABLED,
      adGroupType: AdGroupType.DISPLAY_STANDARD
    };
    const actualValue = await adGroupService.add(adGroup);
  });
});
