import faker from 'faker';

import { adwordsService } from '../../../initialize';
import { IPaging } from '../../../../types/adwords';
import { IAdGroupAd } from '../../../../services/adwords/AdGroupAdService/AdGroupAd';
import { IExpandedTextAd, IResponsiveDisplayAd } from '../../../../services/adwords/AdGroupAdService/Ad';
import { AdGroupAd } from '../../../../services/adwords/AdGroupAdService/enum/AdGroupAd';

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
      numberResults: 3,
    };
    const actualValue = await adGroupAdService.getAllExpandedTextAd(paging);
  });

  it.skip('#getByAdGroupIds', async () => {
    const adGroupIds = ['72029524744'];
    const actualValue = await adGroupAdService.getByAdGroupIds(adGroupIds);
  });

  it('#add', async () => {
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

    const adGroupId = '70137654917';
    const adGroupAds: IAdGroupAd[] = expandedTextAds.map((expandedTextAd: IExpandedTextAd) => {
      const adGroupAd: IAdGroupAd = {
        adGroupId,
        ad: expandedTextAd,
      };
      return adGroupAd;
    });

    const actualValue = await adGroupAdService.add(adGroupAds);
  });

  it.skip('#update', async () => {
    const ads: Array<Partial<IExpandedTextAd>> = [
      {
        id: '331943088184',
      },
      {
        id: '331195148581',
      },
    ];
    const adGroupId = '72029524744';
    const adGroupAds: IAdGroupAd[] = ads.map((ad: Partial<IExpandedTextAd>) => {
      const adGroupAd: IAdGroupAd = {
        adGroupId,
        ad,
        status: AdGroupAd.Status.ENABLED,
      };
      return adGroupAd;
    });

    const actualValue = await adGroupAdService.update(adGroupAds);
  });

  it.skip('should add responsive display ad with image correctly', async () => {
    const responsiveDisplayAds: Array<Partial<IResponsiveDisplayAd>> = [
      {
        finalUrls: [faker.internet.url()], // order is important
        marketingImage: {
          mediaId: '12677923329',
        },
        shortHeadline: faker.lorem.word(),
        longHeadline: faker.lorem.words(3),
        description: faker.lorem.words(5),
        businessName: faker.lorem.word(),
        attributes: {
          'xsi:type': 'ResponsiveDisplayAd',
        },
      },
    ];

    const adGroupId = '72029524744';
    const adGroupAds: IAdGroupAd[] = responsiveDisplayAds.map((ad: Partial<IResponsiveDisplayAd>) => {
      const adGroupAd: IAdGroupAd = {
        adGroupId,
        ad,
      };

      return adGroupAd;
    });

    const actualValue = await adGroupAdService.add(adGroupAds);
  });
});
