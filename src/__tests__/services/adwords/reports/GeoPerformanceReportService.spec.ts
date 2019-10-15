import { adwordsService } from '../../../initialize';
import { ISelector, Predicate } from '../../../../types/adwords';
import { IReportDefinition } from '../../../../services/adwords/ReportDefinitionService/ReportDefinition';
import { reportServiceMocked } from '../../../depsMocked';
import { GeoPerformanceReportService } from '../../../../services/adwords/Reports';
import { ReportDefinition } from '../../../../services/adwords/ReportDefinitionService';

describe('GeoPerformanceReportService test suites', () => {
  const geoPerformanceReportService = adwordsService.getService('GeoPerformanceReportService', {
    reportService: reportServiceMocked,
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('#get', () => {
    const mReport = 'geo performance report service';
    it('should get report correctly with default report definition', async () => {
      reportServiceMocked.reportDownload.mockResolvedValueOnce(mReport);
      const actualvalue = await geoPerformanceReportService.get({});
      expect(actualvalue).toBe(mReport);
      expect(reportServiceMocked.reportDownload).toBeCalledWith({
        selector: {
          fields: [
            'CampaignId',
            'CampaignName',
            'CampaignStatus',
            'CityCriteriaId',
            'CountryCriteriaId',
            'IsTargetingLocation',
            'Clicks',
            'Conversions',
            'ConversionRate',
            'Cost',
            'Ctr',
            'Impressions',
            'AverageCpc',
          ],
        },
        reportName: GeoPerformanceReportService.reportName,
        reportType: ReportDefinition.ReportType.GEO_PERFORMANCE_REPORT,
        dateRangeType: ReportDefinition.DateRangeType.ALL_TIME,
      });
    });

    it('should get report correctly with user custom report definition', async () => {
      reportServiceMocked.reportDownload.mockResolvedValueOnce(mReport);
      const selector: ISelector = {
        fields: [],
        predicates: [
          {
            field: 'CampaignId',
            operator: Predicate.Operator.IN,
            values: ['1733539359', '1648603100'],
          },
        ],
      };
      const reportDefinition: Partial<IReportDefinition> = {
        selector,
        dateRangeType: ReportDefinition.DateRangeType.YESTERDAY,
      };
      const actualvalue = await geoPerformanceReportService.get(reportDefinition);
      expect(actualvalue).toBe(mReport);
      expect(reportServiceMocked.reportDownload).toBeCalledWith({
        selector: reportDefinition.selector,
        reportName: GeoPerformanceReportService.reportName,
        reportType: ReportDefinition.ReportType.GEO_PERFORMANCE_REPORT,
        dateRangeType: reportDefinition.dateRangeType,
      });
    });
  });
});
