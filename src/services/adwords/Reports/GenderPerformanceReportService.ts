import { ReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService';
import { IReportDefinition } from '../ReportDefinitionService/ReportDefinition';

class GenderPerformanceReportService {
  public static readonly reportName: string = 'Gender Performance Report';
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
    ...GenderPerformanceReportService.attributes,
    ...GenderPerformanceReportService.segments,
    ...GenderPerformanceReportService.metrics,
  ];

  private reportService: ReportService;
  constructor(opts: { reportService: ReportService }) {
    this.reportService = opts.reportService;
  }

  public async get() {
    const reportDefinition: IReportDefinition = {
      selector: {
        fields: GenderPerformanceReportService.selectorFields,
      },
      reportName: GenderPerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.GENDER_PERFORMANCE_REPORT,
      dateRangeType: ReportDefinition.DateRangeType.ALL_TIME,
    };
    return this.reportService.reportDownload(reportDefinition, { json: true });
  }
}

export { GenderPerformanceReportService };
