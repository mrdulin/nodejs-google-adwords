import { adwordsService } from '../../initialize';

describe('CampaignPerformanceReportService test suites', () => {
  const genderPerformanceReportService = adwordsService.getService('GenderPerformanceReportService', {
    verbose: true,
  });
  it('#reportDownload', async () => {
    const actualvalue = await genderPerformanceReportService.get();
    // console.log(pd.json(actualvalue));
  });
});
