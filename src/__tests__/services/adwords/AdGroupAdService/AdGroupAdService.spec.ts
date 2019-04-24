import faker from 'faker';

import { adwordsService } from '../../initialize';
import { IPaging } from '../../../../types/adwords';
import { IAdGroupAd } from '../../../../services/adwords/AdGroupAdService/AdGroupAd';
import { IExpandedTextAd } from '../../../../services/adwords/AdGroupAdService/Ad';

describe('AdGroupAdService test suites', () => {
  const adGroupAdService = adwordsService.getService('AdGroupAdService', { verbose: false });
  it.skip('#getAll', async () => {
    const actualValue = await adGroupAdService.getAll();
  });

  it.skip('#getAllMultiAssetResponsiveDisplayAd', async () => {
    const actualValue = await adGroupAdService.getAllMultiAssetResponsiveDisplayAd();
  });

  it.skip('#getAllExpandedTextAd', async () => {
    const actualValue = await adGroupAdService.getAllExpandedTextAd();
  });

  it.skip('#getAllExpandedTextAd - by paging', async () => {
    const paging: IPaging = {
      startIndex: 0,
      numberResults: 3
    };
    const actualValue = await adGroupAdService.getAllExpandedTextAd(paging);
  });

  it.skip('#add', async () => {
    const expandedTextAds: IExpandedTextAd[] = [
      {
        finalUrls: [faker.internet.url()],
        headlinePart1: faker.lorem.words(3),
        headlinePart2: faker.lorem.words(3),
        description: faker.lorem.words(3),
        attributes: {
          'xsi:type': 'ExpandedTextAd'
        }
      },
      {
        finalUrls: [faker.internet.url()],
        headlinePart1: faker.lorem.words(3),
        headlinePart2: faker.lorem.words(3),
        description: faker.lorem.words(3),
        attributes: {
          'xsi:type': 'ExpandedTextAd'
        }
      }
    ];

    const adGroupId = '72029524744';
    const adGroupAds: IAdGroupAd[] = expandedTextAds.map((expandedTextAd: IExpandedTextAd) => {
      const adGroupAd: IAdGroupAd = {
        adGroupId,
        ad: expandedTextAd
      };
      return adGroupAd;
    });

    const actualValue = await adGroupAdService.add(adGroupAds);
  });
});
