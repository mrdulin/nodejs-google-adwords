import { adwordsService } from '../../../initialize';
import { reportServiceMocked } from '../../../depsMocked';
import { GenderPerformanceReportService } from '../../../../services/adwords/Reports';
import { ReportDefinition } from '../../../../services/adwords/ReportDefinitionService';

describe('CampaignPerformanceReportService test suites', () => {
  const genderPerformanceReportService = adwordsService.getService('GenderPerformanceReportService', {
    reportService: reportServiceMocked,
  });
  describe('#get', () => {
    const mReport = 'campaign performance report xml';
    it('should get report correctly with default report definition', async () => {
      reportServiceMocked.reportDownload.mockResolvedValueOnce(mReport);
      const actualvalue = await genderPerformanceReportService.get({});
      expect(actualvalue).toBe(mReport);
      expect(reportServiceMocked.reportDownload).toBeCalledWith({
        selector: {
          fields: [
            'CampaignId',
            'CampaignName',
            'CampaignStatus',
            'Criteria',
            'Clicks',
            'Conversions',
            'ConversionRate',
            'Cost',
            'Ctr',
            'Impressions',
            'AverageCpc',
          ],
        },
        reportName: GenderPerformanceReportService.reportName,
        reportType: ReportDefinition.ReportType.GENDER_PERFORMANCE_REPORT,
        dateRangeType: ReportDefinition.DateRangeType.ALL_TIME,
      });
    });
  });
});
