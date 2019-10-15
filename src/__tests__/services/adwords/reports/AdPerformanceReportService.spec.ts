import { adwordsService } from '../../../initialize';
import { IReportDefinition } from '../../../../services/adwords/ReportDefinitionService/ReportDefinition';
import { Predicate } from '../../../../types/adwords';

import { reportServiceMocked } from '../../../depsMocked';
import { ReportDefinition } from '../../../../services/adwords/ReportDefinitionService';
import { AdPerformanceReportService } from '../../../../services/adwords/Reports';

describe('AdPerformanceReportService test suites', () => {
  const adPerformanceReportService = adwordsService.getService('AdPerformanceReportService', {
    reportService: reportServiceMocked,
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('#get', () => {
    const mReport = 'Adgroup performance report xml';
    it('should get report correctly with default report definition', async () => {
      reportServiceMocked.reportDownload.mockResolvedValueOnce(mReport);
      const actualvalue = await adPerformanceReportService.get({});
      expect(actualvalue).toBe(mReport);
      expect(reportServiceMocked.reportDownload).toBeCalledWith({
        selector: {
          fields: [
            'AdGroupId',
            'AdGroupName',
            'AdGroupStatus',
            'AdType',
            'CampaignId',
            'CampaignName',
            'CampaignStatus',
            'CombinedApprovalStatus',
            'Id',
            'Status',
          ],
        },
        reportName: AdPerformanceReportService.reportName,
        reportType: ReportDefinition.ReportType.AD_PERFORMANCE_REPORT,
        dateRangeType: ReportDefinition.DateRangeType.ALL_TIME,
      });
    });

    it('should get report correctly with user custom report definition', async () => {
      reportServiceMocked.reportDownload.mockResolvedValueOnce(mReport);
      const reportDefinition: Partial<IReportDefinition> = {
        selector: {
          fields: ['AdGroupId', 'AdGroupName', 'AdGroupStatus'],
          predicates: [
            {
              field: 'CampaignId',
              operator: Predicate.Operator.IN,
              values: [
                '1952851832', // campaign status: enabled
                '1648603100', // campaign status: ended
                '1742654618', // campaign status: removed
              ],
            },
          ],
        },
      };
      const actualvalue = await adPerformanceReportService.get(reportDefinition);
      expect(actualvalue).toBe(mReport);
      expect(reportServiceMocked.reportDownload).toBeCalledWith({
        selector: reportDefinition.selector,
        reportName: AdPerformanceReportService.reportName,
        reportType: ReportDefinition.ReportType.AD_PERFORMANCE_REPORT,
        dateRangeType: ReportDefinition.DateRangeType.ALL_TIME,
      });
    });
  });
});
