import { ReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService';
import { IReportDefinition } from '../ReportDefinitionService/ReportDefinition';

class AgeRangePerformanceReportService {
  public static readonly reportName: string = 'Age Range Performance Report';
  private static readonly attributes: string[] = ['CampaignId', 'CampaignName', 'CampaignStatus'];

  private static readonly segments: string[] = [];
  private static readonly metrics: string[] = [
    'Clicks',
    'Conversions',
    'ConversionRate',
    'Cost',
    'Ctr',
    'Impressions',
    'AverageCpc',
  ];
  private static readonly selectorFields = [
    ...AgeRangePerformanceReportService.attributes,
    ...AgeRangePerformanceReportService.segments,
    ...AgeRangePerformanceReportService.metrics,
  ];

  private reportService: ReportService;
  constructor(opts: { reportService: ReportService }) {
    this.reportService = opts.reportService;
  }

  public async get() {
    const reportDefinition: IReportDefinition = {
      selector: {
        fields: AgeRangePerformanceReportService.selectorFields,
      },
      reportName: AgeRangePerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.AGE_RANGE_PERFORMANCE_REPORT,
      dateRangeType: ReportDefinition.DateRangeType.ALL_TIME,
    };
    return this.reportService.reportDownload(reportDefinition, { json: true });
  }
}

export { AgeRangePerformanceReportService };
