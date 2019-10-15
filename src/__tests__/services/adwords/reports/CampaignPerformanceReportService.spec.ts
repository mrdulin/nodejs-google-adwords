import { adwordsService } from '../../../initialize';
import { IReportDefinition } from '../../../../services/adwords/ReportDefinitionService/ReportDefinition';
import { ReportDefinition } from '../../../../services/adwords/ReportDefinitionService';
import { ISelector, Predicate } from '../../../../types/adwords';
import { reportServiceMocked } from '../../../depsMocked';
import { CampaignPerformanceReportService } from '../../../../services/adwords/Reports';

describe('CampaignPerformanceReportService test suites', () => {
  const campaignPerformanceReportService = adwordsService.getService('CampaignPerformanceReportService', {
    reportService: reportServiceMocked,
  });

  describe('#get', () => {
    const mReport = 'campaign performance report xml';
    it('should get report correctly with default report definition', async () => {
      reportServiceMocked.reportDownload.mockResolvedValueOnce(mReport);
      const actualvalue = await campaignPerformanceReportService.get({});
      expect(actualvalue).toBe(mReport);
      expect(reportServiceMocked.reportDownload).toBeCalledWith({
        selector: {
          fields: [
            'CampaignId',
            'CampaignName',
            'CampaignStatus',
            'StartDate',
            'EndDate',
            'Clicks',
            'Conversions',
            'Ctr',
            'Cost',
            'Impressions',
            'ConversionRate',
            'AverageCpc',
          ],
        },
        reportName: CampaignPerformanceReportService.reportName,
        reportType: ReportDefinition.ReportType.CAMPAIGN_PERFORMANCE_REPORT,
        dateRangeType: ReportDefinition.DateRangeType.ALL_TIME,
      });
    });

    it('should get report correctly with user custom report definition', async () => {
      reportServiceMocked.reportDownload.mockResolvedValueOnce(mReport);
      const selector: ISelector = {
        fields: ['CampaignId', 'CampaignName', 'CampaignStatus'],
        predicates: [
          {
            field: 'CampaignId',
            operator: Predicate.Operator.IN,
            values: ['1532562169'],
          },
        ],
      };
      const reportDefinition: Partial<IReportDefinition> = {
        selector,
        dateRangeType: ReportDefinition.DateRangeType.YESTERDAY,
      };
      const actualvalue = await campaignPerformanceReportService.get(reportDefinition);
      expect(actualvalue).toBe(mReport);
      expect(reportServiceMocked.reportDownload).toBeCalledWith({
        selector: reportDefinition.selector,
        reportName: CampaignPerformanceReportService.reportName,
        reportType: ReportDefinition.ReportType.CAMPAIGN_PERFORMANCE_REPORT,
        dateRangeType: reportDefinition.dateRangeType,
      });
    });
  });
});
