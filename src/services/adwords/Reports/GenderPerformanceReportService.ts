import { ReportService, IClientReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService';
import { IReportDefinition } from '../ReportDefinitionService/ReportDefinition';
import _ from 'lodash';

class GenderPerformanceReportService implements IClientReportService {
  public static readonly reportName: string = 'Gender Performance Report';
  private static readonly attributes: string[] = ['CampaignId', 'CampaignName', 'CampaignStatus', 'Criteria'];

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
  private constructor(opts: { reportService: ReportService }) {
    this.reportService = opts.reportService;
  }

  public async get(reportDefinition: Partial<IReportDefinition>) {
    const reportDef: IReportDefinition = {
      // order is matter
      selector: _.get(reportDefinition, 'selector', { fields: GenderPerformanceReportService.selectorFields }),
      reportName: GenderPerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.GENDER_PERFORMANCE_REPORT,
      dateRangeType: reportDefinition.dateRangeType || ReportDefinition.DateRangeType.ALL_TIME,
    };

    return this.reportService.reportDownload(reportDef);
  }
}

export { GenderPerformanceReportService };
