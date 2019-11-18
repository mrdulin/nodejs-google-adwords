import { IReportService, IClientReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService';
import { IReportDefinition } from '../ReportDefinitionService/ReportDefinition';
import _ from 'lodash';
import { ClientReportService } from './AbstractClientReportService';

class SearchQueryPerformanceReportService extends ClientReportService implements IClientReportService {
  public static readonly reportName: string = 'Search Query Performance Report';
  private static readonly attributes: string[] = [
    'AdGroupId',
    'AdGroupName',
    'AdGroupStatus',
    'CampaignId',
    'CampaignName',
    'CampaignStatus',
    'KeywordId',
    'Query',
    'QueryTargetingStatus',
  ];
  private static readonly segments: string[] = ['QueryMatchTypeWithVariant'];
  private static readonly metrics: string[] = ['Clicks', 'Impressions', 'Cost', 'Ctr', 'AverageCpv'];

  private static readonly selectorFields = [
    ...SearchQueryPerformanceReportService.attributes,
    ...SearchQueryPerformanceReportService.segments,
    ...SearchQueryPerformanceReportService.metrics,
  ];

  private reportService: IReportService;
  private constructor(opts: { reportService: IReportService }) {
    super();
    this.reportService = opts.reportService;
  }

  public async get(reportDefinition: Partial<IReportDefinition>) {
    const reportDef: IReportDefinition = {
      // order is matter
      selector: _.get(reportDefinition, 'selector', { fields: SearchQueryPerformanceReportService.selectorFields }),
      reportName: SearchQueryPerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.SEARCH_QUERY_PERFORMANCE_REPORT,
      dateRangeType: _.get(reportDefinition, 'dateRangeType', ReportDefinition.DateRangeType.ALL_TIME),
    };

    return this.reportService.reportDownload(reportDef, this.getOptions());
  }
}

export { SearchQueryPerformanceReportService };
