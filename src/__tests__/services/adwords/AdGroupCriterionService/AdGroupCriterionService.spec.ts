import faker from 'faker';

import { adwordsService } from '../../initialize';
import {
  IBiddableAdGroupCriterion,
  INegativeAdGroupCriterion,
} from '../../../../services/adwords/AdGroupCriterionService/AdGroupCriterion';
import { KeywordMatchType } from '../../../../services/adwords/AdGroupCriterionService/enum/KeywordMatchType';

describe('AdGroupCriterionService test suites', () => {
  const adGroupCriterionService = adwordsService.getService('AdGroupCriterionService', {
    verbose: true,
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

  it.skip('#add', async () => {
    const adGroupId = '72029524744';
    const adGroupCrierions: Array<IBiddableAdGroupCriterion | INegativeAdGroupCriterion> = [
      {
        adGroupId,
        criterion: {
          text: faker.lorem.word(),
          matchType: KeywordMatchType.EXACT,
          attributes: {
            'xsi:type': 'Keyword',
          },
        },
        attributes: {
          'xsi:type': 'BiddableAdGroupCriterion',
        },
      },
      {
        adGroupId,
        criterion: {
          text: faker.lorem.word(),
          matchType: KeywordMatchType.EXACT,
          attributes: {
            'xsi:type': 'Keyword',
          },
        },
        attributes: {
          'xsi:type': 'NegativeAdGroupCriterion',
        },
      },
    ];

    const actualValue = await adGroupCriterionService.add(adGroupCrierions);
  });

  it('should handle partialFailure correctly', async () => {
    const adGroupId = '72029524744';
    const adGroupCrierions: Array<IBiddableAdGroupCriterion | INegativeAdGroupCriterion> = [
      {
        adGroupId,
        criterion: {
          text: 'inv@lid cruise',
          matchType: KeywordMatchType.EXACT,
          attributes: {
            'xsi:type': 'Keyword',
          },
        },
        attributes: {
          'xsi:type': 'BiddableAdGroupCriterion',
        },
      },
      {
        adGroupId,
        criterion: {
          text: faker.lorem.word(),
          matchType: KeywordMatchType.EXACT,
          attributes: {
            'xsi:type': 'Keyword',
          },
        },
        attributes: {
          'xsi:type': 'NegativeAdGroupCriterion',
        },
      },
    ];

    const actualValue = await adGroupCriterionService.add(adGroupCrierions);
  });
});
