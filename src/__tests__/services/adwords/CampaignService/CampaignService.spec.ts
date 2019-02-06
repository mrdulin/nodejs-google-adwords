import { adwordsService } from '../../initialize';

describe('CampaignService test suites', () => {
  it('#gerAll', async () => {
    const campaignService = adwordsService.getService('CampaignService');
    const actualValue = await campaignService.getAll();
  });
});
