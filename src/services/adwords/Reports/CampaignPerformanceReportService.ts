import { ReportService, IClientReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService/enum/ReportDefinition';
import { IReportDefinition } from '../ReportDefinitionService/ReportDefinition';
import _ from 'lodash';
import { ClientReportService } from './AbstractClientReportService';

/**
 * https://developers.google.com/adwords/api/docs/appendix/reports/campaign-performance-report
 *
 * @author dulin
 * @class CampaignPerformanceReportService
 * @implements {IClientReportService}
 */
class CampaignPerformanceReportService extends ClientReportService implements IClientReportService {
  public static readonly reportName: string = 'Campaign Performance Report';
  private static readonly attributes: string[] = [
    'CampaignId',
    'CampaignName',
    'CampaignStatus',
    'StartDate',
    'EndDate',
  ];
  private static readonly segments: string[] = [];
  private static readonly metrics: string[] = [
    'Clicks',
    'Conversions',
    'Ctr',
    'Cost',
    'Impressions',
    'ConversionRate',
    'AverageCpc',
  ];
  private static readonly selectorFields = [
    ...CampaignPerformanceReportService.attributes,
    ...CampaignPerformanceReportService.segments,
    ...CampaignPerformanceReportService.metrics,
  ];

  private reportService: ReportService;
  private constructor(opts: { reportService: ReportService }) {
    super();
    this.reportService = opts.reportService;
  }

  public async get(reportDefinition: Partial<IReportDefinition>) {
    const reportDef: IReportDefinition = {
      // order is matter
      selector: _.get(reportDefinition, 'selector', { fields: CampaignPerformanceReportService.selectorFields }),
      reportName: CampaignPerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.CAMPAIGN_PERFORMANCE_REPORT,
      dateRangeType: reportDefinition.dateRangeType || ReportDefinition.DateRangeType.ALL_TIME,
    };

    return this.reportService.reportDownload(reportDef, this.getOptions());
  }
}

export { CampaignPerformanceReportService };
