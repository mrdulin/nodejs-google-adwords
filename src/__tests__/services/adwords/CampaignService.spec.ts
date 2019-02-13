import { ICampaignServiceSelector, CampaignService } from '../../../services';
import { adwordsService } from '../initialize';

describe('CampaignService test suites', () => {
  it('#getCampaigns', async () => {
    const campaignService = adwordsService.getService('CampaignService');
    const selector: ICampaignServiceSelector = {
      fields: ['Id', 'Name', 'Status']
    };
    const actualValue = await campaignService.getCampaigns(selector);
  });
});
