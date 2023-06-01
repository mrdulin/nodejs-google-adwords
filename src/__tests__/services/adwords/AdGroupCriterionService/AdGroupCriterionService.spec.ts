import { faker } from '@faker-js/faker';;

import { adwordsService } from '../../../initialize';
import {
  IBiddableAdGroupCriterion,
  INegativeAdGroupCriterion,
} from '../../../../services/adwords/AdGroupCriterionService/AdGroupCriterion';
import { KeywordMatchType } from '../../../../services/adwords/AdGroupCriterionService/enum/KeywordMatchType';
import { UserStatus } from '../../../../services/adwords/AdGroupCriterionService/enum/UserStatus';
import { AgeRange } from '../../../../services/adwords/AdGroupCriterionService/enum/AgeRange';
import { Gender } from '../../../../services/adwords/AdGroupCriterionService/enum/Gender';
import { CriterionUse } from '../../../../services/adwords/AdGroupCriterionService/enum/CriterionUse';

describe.skip('AdGroupCriterionService test suites', () => {
  const adGroupCriterionService = adwordsService.getService('AdGroupCriterionService', {
    verbose: false,
    partialFailure: true,
  });
  it.skip('#getByAdGroupIds', async () => {
    const adGroupIds = ['72029524744'];
    const actualValue = await adGroupCriterionService.getByAdGroupIds(adGroupIds);
  });

  it.skip('#getKeywordCriterionByAdGroupIds', async () => {
    const adGroupIds = ['72029524744'];
    const actualValue = await adGroupCriterionService.getKeywordCriterionByAdGroupIds(adGroupIds);
  });

  it.skip('#add - should create criterions correctly', async () => {
    const adGroupId = '70137654917';
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
          text: faker.lorem.word(),
          matchType: KeywordMatchType.EXACT,
        },
        criterionUse: CriterionUse.NEGATIVE,
      },
      {
        adGroupId,
        userStatus: UserStatus.ENABLED,
        criterion: {
          id: 503999,
          ageRangeType: AgeRange.AgeRangeType.AGE_RANGE_UNDETERMINED,
        },
        criterionUse: CriterionUse.BIDDABLE,
      },
      {
        adGroupId,
        userStatus: UserStatus.ENABLED,
        criterion: {
          id: 20,
          genderType: Gender.GenderType.GENDER_UNDETERMINED,
        },
        criterionUse: CriterionUse.BIDDABLE,
      },
    ];

    const actualValue = await adGroupCriterionService.add(adGroupCrierions);
  });

  it.skip('should handle partialFailure correctly', async () => {
    const adGroupId = '72029524744';
    const adGroupCrierions: Array<IBiddableAdGroupCriterion | INegativeAdGroupCriterion> = [
      {
        adGroupId,
        criterion: {
          text: 'inv@lid cruise',
          matchType: KeywordMatchType.EXACT,
        },
      },
      {
        adGroupId,
        criterion: {
          text: faker.lorem.word(),
          matchType: KeywordMatchType.EXACT,
        },
      },
    ];
    const actualValue = await adGroupCriterionService.add(adGroupCrierions);
  });

  it('CONCURRENT_MODIFICATION', async () => {
    const adGroupId = '70137654917';
    const adGroupCrierions = [
      {
        adGroupId,
        criterion: {
          id: 503999,
          ageRangeType: AgeRange.AgeRangeType.AGE_RANGE_UNDETERMINED,
        },
        criterionUse: CriterionUse.BIDDABLE,
      },
      {
        adGroupId,
        criterion: {
          id: 20,
          genderType: Gender.GenderType.GENDER_UNDETERMINED,
        },
        criterionUse: CriterionUse.BIDDABLE,
      },
      {
        adGroupId,
        criterion: {
          text: 'create-campaign',
          matchType: KeywordMatchType.EXACT,
        },
        criterionUse: CriterionUse.BIDDABLE,
      },
      {
        adGroupId,
        criterion: {
          text: 'jectcedar.pwc.com/create-campaign',
          matchType: KeywordMatchType.EXACT,
        },
        criterionUse: CriterionUse.BIDDABLE,
      },
      {
        adGroupId,
        criterion: {
          text: 'campaign',
          matchType: KeywordMatchType.EXACT,
        },
        criterionUse: CriterionUse.NEGATIVE,
      },
      {
        adGroupId,
        criterion: {
          text: '33campaign',
          matchType: KeywordMatchType.EXACT,
        },
        criterionUse: CriterionUse.NEGATIVE,
      },
    ];

    const actualValue = await adGroupCriterionService.add(adGroupCrierions);
  });
});
