import { IReportService, IClientReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService';
import { IReportDefinition } from '../ReportDefinitionService/ReportDefinition';
import _ from 'lodash';

class AdGroupPerformanceReportService implements IClientReportService {
  public static readonly reportName: string = 'Adgroup Performance Report';
  private static readonly attributes: string[] = [
    'AdGroupId',
    'AdGroupName',
    'AdGroupStatus',
    'CampaignId',
    'CampaignName',
    'CampaignStatus',
  ];
  private static readonly segments: string[] = ['Device'];
  private static readonly metrics: string[] = [
    'Clicks',
    'Impressions',
    'Ctr',
    'AverageCpc',
    'Cost',
    'Conversions',
    'AveragePosition',
  ];

  private static readonly selectorFields = [
    ...AdGroupPerformanceReportService.attributes,
    ...AdGroupPerformanceReportService.segments,
    ...AdGroupPerformanceReportService.metrics,
  ];

  private reportService: IReportService;
  private constructor(opts: { reportService: IReportService }) {
    this.reportService = opts.reportService;
  }

  public async get(reportDefinition: Partial<IReportDefinition>) {
    const reportDef: IReportDefinition = {
      // order is matter
      selector: _.get(reportDefinition, 'selector', { fields: AdGroupPerformanceReportService.selectorFields }),
      reportName: AdGroupPerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.AD_GROUP_PERFORMANCE_REPORT,
      dateRangeType: _.get(reportDefinition, 'dateRangeType', ReportDefinition.DateRangeType.ALL_TIME),
    };

    return this.reportService.reportDownload(reportDef);
  }
}

export { AdGroupPerformanceReportService };
