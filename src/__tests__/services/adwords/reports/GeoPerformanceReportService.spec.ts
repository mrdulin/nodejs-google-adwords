import { adwordsService } from '../../initialize';

describe('GeoPerformanceReportService test suites', () => {
  const geoPerformanceReportService = adwordsService.getService('GeoPerformanceReportService', {
    verbose: true,
  });
  it('#reportDownload', async () => {
    const actualvalue = await geoPerformanceReportService.get();
    // console.log(pd.json(actualvalue));
  });
});
