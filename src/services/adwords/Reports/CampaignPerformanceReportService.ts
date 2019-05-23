import { ReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService/enum/ReportDefinition';
import { IReportDefinition } from '../ReportDefinitionService/ReportDefinition';
import { pd } from 'pretty-data';
import _ from 'lodash';

/**
 * https://developers.google.com/adwords/api/docs/appendix/reports/campaign-performance-report
 *
 * @author dulin
 * @class CampaignPerformanceReportService
 */
class CampaignPerformanceReportService {
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
  constructor(opts: { reportService: ReportService }) {
    this.reportService = opts.reportService;
  }

  public setVerbose(verbose: boolean) {
    this.reportService.setVerbose(verbose);
  }

  public async get(reportDefinition: Partial<IReportDefinition>) {
    const reportDef: IReportDefinition = {
      // order is matter
      selector: _.defaultsDeep(reportDefinition.selector, {
        fields: CampaignPerformanceReportService.selectorFields,
      }),
      reportName: CampaignPerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.CAMPAIGN_PERFORMANCE_REPORT,
      dateRangeType: reportDefinition.dateRangeType || ReportDefinition.DateRangeType.ALL_TIME,
    };

    return this.reportService.reportDownload(reportDef);
  }
}

export { CampaignPerformanceReportService };
