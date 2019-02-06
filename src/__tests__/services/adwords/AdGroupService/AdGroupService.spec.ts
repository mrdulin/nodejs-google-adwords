import { adwordsService } from '../../initialize';

describe('AdGroupService test suites', () => {
  it('#getAll', async () => {
    const adGroupService = adwordsService.getService('AdGroupService');
    const actualValue = await adGroupService.getAll();
  });
});
