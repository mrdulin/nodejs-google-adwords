import { adwordsService } from '../../../initialize';
import { SearchQueryPerformanceReportService } from '../../../../services/adwords/Reports';
import { reportServiceMocked } from '../../../depsMocked';
import { ReportDefinition } from '../../../../services/adwords/ReportDefinitionService';

describe('SearchQueryPerformanceReportService', () => {
  const searchQueryPerformanceReportService = adwordsService.getService('SearchQueryPerformanceReportService', {
    reportService: reportServiceMocked,
  });

  describe('#get', () => {
    const mReport = 'search query performance report xml';
    it('should get report correctly with default report definition', async () => {
      reportServiceMocked.reportDownload.mockResolvedValueOnce(mReport);
      const actualValue = await searchQueryPerformanceReportService.get({});
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
            'KeywordId',
            'Query',
            'QueryTargetingStatus',
            'QueryMatchTypeWithVariant',
            'Clicks',
            'Impressions',
            'Cost',
            'Ctr',
            'AverageCpv',
          ],
        },
        reportName: SearchQueryPerformanceReportService.reportName,
        reportType: ReportDefinition.ReportType.SEARCH_QUERY_PERFORMANCE_REPORT,
        dateRangeType: ReportDefinition.DateRangeType.ALL_TIME,
      });
    });

    it('should get report correctly with default report definition', async () => {
      const reportDefinition = {
        selector: {
          fields: [
            'AdGroupId',
            'AdGroupName',
            'AdGroupStatus',
            'CampaignId',
            'CampaignName',
            'CampaignStatus',
            'KeywordId',
            'Query',
            'QueryTargetingStatus',
            'QueryMatchTypeWithVariant',
            'Clicks',
            'Impressions',
            'Cost',
            'Ctr',
            'AverageCpc',
          ],
        },
      };
      reportServiceMocked.reportDownload.mockResolvedValueOnce(mReport);
      const actualValue = await searchQueryPerformanceReportService.get(reportDefinition);
      expect(actualValue).toBe(mReport);
      expect(reportServiceMocked.reportDownload).toBeCalledWith({
        selector: reportDefinition.selector,
        reportName: SearchQueryPerformanceReportService.reportName,
        reportType: ReportDefinition.ReportType.SEARCH_QUERY_PERFORMANCE_REPORT,
        dateRangeType: ReportDefinition.DateRangeType.ALL_TIME,
      });
    });
  });
});
