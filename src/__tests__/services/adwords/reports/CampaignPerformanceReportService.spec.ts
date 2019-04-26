import { adwordsService } from '../../initialize';

describe('CampaignPerformanceReportService test suites', () => {
  const campaignPerformanceReportService = adwordsService.getService('CampaignPerformanceReportService', {
    verbose: true,
  });
  it('#reportDownload', async () => {
    const actualvalue = await campaignPerformanceReportService.get();
  });
});
