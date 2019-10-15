import faker from 'faker';
import { adwordsService } from '../initialize';
import { IAdGroup } from '../../services/adwords/AdGroupService';
import { AdGroupStatus } from '../../services/adwords/AdGroupService/enum/AdGroupStatus';
import { AdGroupType } from '../../services/adwords/AdGroupService/enum/AdGroupType';
import { IAdGroupAd, IExpandedTextAd } from '../../services/adwords/AdGroupAdService';
import { UserStatus } from '../../services/adwords/AdGroupCriterionService/enum/UserStatus';
import { IBiddableAdGroupCriterion, INegativeAdGroupCriterion } from '../../services/adwords/AdGroupCriterionService';
import { KeywordMatchType } from '../../services/adwords/AdGroupCriterionService/enum/KeywordMatchType';
import { CriterionUse } from '../../services/adwords/AdGroupCriterionService/enum/CriterionUse';

const adGroupService = adwordsService.getService('AdGroupService', { verbose: false });
const adGroupAdService = adwordsService.getService('AdGroupAdService');
const adGroupCriterionService = adwordsService.getService('AdGroupCriterionService');

async function createAdGroup(campaignId) {
  const adGroupDTO: IAdGroup = {
    campaignId,
    name: faker.lorem.slug(1),
    status: AdGroupStatus.ENABLED,
    adGroupType: AdGroupType.DISPLAY_STANDARD,
  };
  return await adGroupService.add(adGroupDTO);
}

async function createAdGroupAd(adGroupId) {
  const expandedTextAds: IExpandedTextAd[] = [
    {
      finalUrls: [faker.internet.url()],
      headlinePart1: faker.lorem.words(3),
      headlinePart2: faker.lorem.words(3),
      description: faker.lorem.words(3),
    },
    {
      finalUrls: [faker.internet.url()],
      headlinePart1: faker.lorem.words(3),
      headlinePart2: faker.lorem.words(3),
      description: faker.lorem.words(3),
    },
  ];
  const adGroupAds: IAdGroupAd[] = expandedTextAds.map((expandedTextAd: IExpandedTextAd) => {
    const adGroupAd: IAdGroupAd = {
      adGroupId,
      ad: expandedTextAd,
    };
    return adGroupAd;
  });

  return await adGroupAdService.add(adGroupAds);
}

async function createAdGroupCriterion(adGroupId) {
  const adGroupCrierions: Array<IBiddableAdGroupCriterion | INegativeAdGroupCriterion> = [
    {
      adGroupId,
      userStatus: UserStatus.ENABLED,
      criterion: {
        text: faker.lorem.word(),
        matchType: KeywordMatchType.EXACT,
      },
      criterionUse: CriterionUse.BIDDABLE,
    },
    {
      adGroupId,
      criterion: {
        text: faker.lorem.slug(),
        matchType: KeywordMatchType.EXACT,
      },
      criterionUse: CriterionUse.NEGATIVE,
    },
  ];
  return await adGroupCriterionService.add(adGroupCrierions);
}
describe.skip('concurrency test suites', () => {
  it('#1', async () => {
    expect.assertions(1);
    const adGroupId = '78662713588';
    try {
      await Promise.all([createAdGroupAd(adGroupId), createAdGroupCriterion(adGroupId)]);
    } catch (error) {
      expect(error.message).toContain('DatabaseError.CONCURRENT_MODIFICATION');
    }
  });
});
