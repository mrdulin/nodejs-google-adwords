import { IReportService, IClientReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService';
import { IReportDefinition } from '../ReportDefinitionService/ReportDefinition';
import _ from 'lodash';

class AudiencePerformanceReportService implements IClientReportService {
  public static readonly reportName: string = 'Audience Performance Report';
  private static readonly attributes: string[] = ['Criteria'];
  private static readonly segments: string[] = ['Clicks', 'Impressions', 'Cost', 'Conversions'];
  private static readonly metrics: string[] = [];

  private static readonly selectorFields = [
    ...AudiencePerformanceReportService.attributes,
    ...AudiencePerformanceReportService.segments,
    ...AudiencePerformanceReportService.metrics,
  ];

  private reportService: IReportService;
  private constructor(opts: { reportService: IReportService }) {
    this.reportService = opts.reportService;
  }

  public async get(reportDefinition: Partial<IReportDefinition>) {
    const reportDef: IReportDefinition = {
      // order is matter
      selector: _.get(reportDefinition, 'selector', { fields: AudiencePerformanceReportService.selectorFields }),
      reportName: AudiencePerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.AUDIENCE_PERFORMANCE_REPORT,
      dateRangeType: _.get(reportDefinition, 'dateRangeType', ReportDefinition.DateRangeType.ALL_TIME),
    };

    return this.reportService.reportDownload(reportDef);
  }
}

export { AudiencePerformanceReportService };
