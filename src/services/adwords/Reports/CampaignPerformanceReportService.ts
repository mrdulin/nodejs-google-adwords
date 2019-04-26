import { ReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService/enum/ReportDefinition';
import { IReportDefinition } from '../ReportDefinitionService/ReportDefinition';

/**
 * https://developers.google.com/adwords/api/docs/appendix/reports/campaign-performance-report
 *
 * @author dulin
 * @class CampaignPerformanceReportService
 */
class CampaignPerformanceReportService {
  public static readonly reportName: string = 'Campaign Performance Report';
  private static readonly attibutes: string[] = [
    'CampaignId',
    'CampaignName',
    'CampaignStatus',
    'StartDate',
    'EndDate',
  ];
  private static readonly segments: string[] = ['Device'];
  private static readonly metrics: string[] = [
    'Clicks',
    'Conversions',
    'Ctr',
    'Impressions',
    'ConversionRate',
    'AverageCpc',
  ];
  private static readonly selectorFields = [
    ...CampaignPerformanceReportService.attibutes,
    ...CampaignPerformanceReportService.segments,
    ...CampaignPerformanceReportService.metrics,
  ];

  private reportService: ReportService;
  constructor(opts: { reportService: ReportService }) {
    this.reportService = opts.reportService;
  }

  public async get() {
    const reportDefinition: IReportDefinition = {
      selector: {
        fields: CampaignPerformanceReportService.selectorFields,
      },
      reportName: CampaignPerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.CAMPAIGN_PERFORMANCE_REPORT,
      dateRangeType: ReportDefinition.DateRangeType.ALL_TIME,
    };

    return this.reportService.reportDownload(reportDefinition, { json: true });
  }
}

export { CampaignPerformanceReportService };
