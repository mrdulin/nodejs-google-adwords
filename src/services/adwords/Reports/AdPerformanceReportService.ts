import { ReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService';
import { IReportDefinition } from '../ReportDefinitionService/ReportDefinition';
import _ from 'lodash';

class AdPerformanceReportService {
  public static readonly reportName: string = 'Ad Performance Report';
  private static readonly attributes: string[] = [
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
  ];
  private static readonly segments: string[] = [];
  private static readonly metrics: string[] = [];

  private static readonly selectorFields = [
    ...AdPerformanceReportService.attributes,
    ...AdPerformanceReportService.segments,
    ...AdPerformanceReportService.metrics,
  ];

  private reportService: ReportService;
  constructor(opts: { reportService: ReportService }) {
    this.reportService = opts.reportService;
  }

  public async get(reportDefinition: Partial<IReportDefinition>) {
    const reportDef: IReportDefinition = {
      // order is matter
      selector: _.get(reportDefinition, 'selector', { fields: AdPerformanceReportService.selectorFields }),
      reportName: AdPerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.AD_PERFORMANCE_REPORT,
      dateRangeType: _.get(reportDefinition, 'dateRangeType', ReportDefinition.DateRangeType.ALL_TIME),
    };

    return this.reportService.reportDownload(reportDef);
  }
}

export { AdPerformanceReportService };
