import { pd } from 'pretty-data';

import { adwordsService } from '../../initialize';

describe('CampaignPerformanceReportService test suites', () => {
  const campaignPerformanceReportService = adwordsService.getService('CampaignPerformanceReportService', {
    verbose: true,
  });
  it('#reportDownload', async () => {
    const actualvalue = await campaignPerformanceReportService.get();
    // console.log(pd.json(actualvalue));
  });
});
