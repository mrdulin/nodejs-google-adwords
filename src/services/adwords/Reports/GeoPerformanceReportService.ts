import { ReportService } from '../ReportService';
import { IReportDefinition } from '../ReportDefinitionService/ReportDefinition';
import { ReportDefinition } from '../ReportDefinitionService';

class GeoPerformanceReportService {
  public static readonly reportName: string = 'Geo Performance Report';
  private static readonly attributes: string[] = [
    'CampaignId',
    'CampaignName',
    'CampaignStatus',
    'CityCriteriaId',
    'CountryCriteriaId',
    'IsTargetingLocation',
  ];

  private static readonly segments: string[] = ['LocationType'];
  private static readonly metrics: string[] = [
    'Clicks',
    'Conversions',
    'ConversionRate',
    'Cost',
    'Ctr',
    'Impressions',
    'AverageCpc',
    'ImpressionReach',
  ];
  private static readonly selectorFields = [
    ...GeoPerformanceReportService.attributes,
    ...GeoPerformanceReportService.segments,
    ...GeoPerformanceReportService.metrics,
  ];

  private reportService: ReportService;
  constructor(opts: { reportService: ReportService }) {
    this.reportService = opts.reportService;
  }
  public async get() {
    const reportDefinition: IReportDefinition = {
      selector: {
        fields: GeoPerformanceReportService.selectorFields,
      },
      reportName: GeoPerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.GEO_PERFORMANCE_REPORT,
      dateRangeType: ReportDefinition.DateRangeType.ALL_TIME,
    };
    return this.reportService.reportDownload(reportDefinition);
  }
}

export { GeoPerformanceReportService };
