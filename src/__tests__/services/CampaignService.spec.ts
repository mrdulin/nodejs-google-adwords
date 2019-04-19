import { CampaignService, ICampaignServiceSelector } from '../../services';

import { credentials } from '../../credentials';

describe('CampaignService test suites', () => {
  it('#getCampaigns', async () => {
    const campaignService = new CampaignService({
      clientCustomerId: credentials.ADWORDS_CLIENT_CUSTOMER_ID,
      developerToken: credentials.ADWORDS_DEVELOPER_TOKEN,
      userAgent: credentials.ADWORDS_USER_AGENT,
      clientId: credentials.ADWORDS_CLIENT_ID,
      clientSecret: credentials.ADWORDS_SECRET,
      validateOnly: false,
      partialFailure: false,
      credentials: {
        // access_token: credentials.ADWORDS_ACCESS_TOKEN
        refresh_token: credentials.ADWORDS_REFRESH_TOKEN
      }
    });

    const selector: ICampaignServiceSelector = {
      fields: ['Id', 'Name', 'Status']
    };
    const actualValue = await campaignService.getCampaigns(selector);
  });
});
