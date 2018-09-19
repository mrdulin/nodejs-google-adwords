import { adwordsService } from '../../initialize';
import { IPaging } from '../../../../models/adwords';

describe('AdGroupAdService test suites', () => {
  const adGroupAdService = adwordsService.getService('AdGroupAdService');
  it.skip('#getAll', async () => {
    const actualValue = await adGroupAdService.getAll();
  });

  it.skip('#getAllMultiAssetResponsiveDisplayAd', async () => {
    const actualValue = await adGroupAdService.getAllMultiAssetResponsiveDisplayAd();
  });

  it.skip('#getAllExpandedTextAd', async () => {
    const actualValue = await adGroupAdService.getAllExpandedTextAd();
  });

  it('#getAllExpandedTextAd - by paging', async () => {
    const paging: IPaging = {
      startIndex: 0,
      numberResults: 3
    };
    const actualValue = await adGroupAdService.getAllExpandedTextAd(paging);
  });
});
