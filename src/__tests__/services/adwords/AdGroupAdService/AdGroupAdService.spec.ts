import faker from 'faker';

import { adwordsService } from '../../initialize';
import { IPaging } from '../../../../types/adwords';
import { IAdGroupAd } from '../../../../services/adwords/AdGroupAdService/AdGroupAd';
import { IExpandedTextAd, IAd } from '../../../../services/adwords/AdGroupAdService/Ad';
import { AdGroupAd } from '../../../../services/adwords/AdGroupAdService/enum/AdGroupAd';

describe('AdGroupAdService test suites', () => {
  const adGroupAdService = adwordsService.getService('AdGroupAdService', { verbose: true });
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

  it.skip('#getByAdGroupIds', async () => {
    const adGroupIds = ['72029524744'];
    const actualValue = await adGroupAdService.getByAdGroupIds(adGroupIds);
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

  it.skip('#update', async () => {
    const ads: IAd[] = [
      {
        id: '331943088184'
      },
      {
        id: '331195148581'
      }
    ];
    const adGroupId = '72029524744';
    const adGroupAds: IAdGroupAd[] = ads.map((ad: IAd) => {
      const adGroupAd: IAdGroupAd = {
        adGroupId,
        ad,
        status: AdGroupAd.Status.ENABLED
      };
      return adGroupAd;
    });

    const actualValue = await adGroupAdService.update(adGroupAds);
  });
});
