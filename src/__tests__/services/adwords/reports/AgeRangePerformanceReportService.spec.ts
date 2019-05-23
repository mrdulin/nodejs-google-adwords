import { pd } from 'pretty-data';
import { adwordsService } from '../../initialize';

describe('AgeRangePerformanceReportService test suites', () => {
  const ageRangePerformanceReportService = adwordsService.getService('AgeRangePerformanceReportService', {
    verbose: true,
  });
  it('#reportDownload', async () => {
    const actualvalue = await ageRangePerformanceReportService.get({});
    console.log(pd.xml(actualvalue));
  });
});
