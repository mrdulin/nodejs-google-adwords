import { AdWordsService } from '../../services/adwords';
import { credentials } from '../../credentials';

const adwordsService = new AdWordsService({
  clientCustomerId: credentials.ADWORDS_CLIENT_CUSTOMER_ID,
  developerToken: credentials.ADWORDS_DEVELOPER_TOKEN,
  userAgent: credentials.ADWORDS_USER_AGENT,
  clientId: credentials.ADWORDS_CLIENT_ID,
  clientSecret: credentials.ADWORDS_SECRET,
  credentials: {
    refresh_token: credentials.ADWORDS_REFRESH_TOKEN,
  },
  // validateOnly: true,
  // partialFailure: true
});
adwordsService.setVerbose(false);

export { adwordsService };
