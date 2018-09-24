import { adwordsService } from '../../initialize';

describe('AdGroupService test suites', () => {
  const adGroupService = adwordsService.getService('AdGroupService');
  it('#getAll', async () => {
    const actualValue = await adGroupService.getAll();
  });
});
