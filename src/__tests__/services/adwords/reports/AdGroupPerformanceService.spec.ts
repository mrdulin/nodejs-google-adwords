import { adwordsService } from '../../../initialize';
import { AdGroupPerformanceReportService } from '../../../../services/adwords/Reports';
import { reportServiceMocked } from '../../../depsMocked';
import { ReportDefinition } from '../../../../services/adwords/ReportDefinitionService';

describe('AdGroupPerformanceReportService', () => {
  const adGroupPerformanceReportService = adwordsService.getService('AdGroupPerformanceReportService', {
    reportService: reportServiceMocked,
  });

  describe('#get', () => {
    const mReport = 'ad group performance report xml';
    it('should get report correctly with default report definition', async () => {
      reportServiceMocked.reportDownload.mockResolvedValueOnce(mReport);
      const actualValue = await adGroupPerformanceReportService.get({});
      expect(actualValue).toBe(mReport);
      expect(reportServiceMocked.reportDownload).toBeCalledWith({
        selector: {
          fields: [
            'AdGroupId',
            'AdGroupName',
            'AdGroupStatus',
            'CampaignId',
            'CampaignName',
            'CampaignStatus',
            'Device',
            'Clicks',
            'Impressions',
            'Ctr',
            'AverageCpc',
            'Cost',
            'Conversions',
            'AveragePosition',
          ],
        },
        reportName: AdGroupPerformanceReportService.reportName,
        reportType: ReportDefinition.ReportType.ADGROUP_PERFORMANCE_REPORT,
        dateRangeType: ReportDefinition.DateRangeType.ALL_TIME,
      });
    });
  });
});
