import { IReportService, IClientReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService';
import { IReportDefinition } from '../ReportDefinitionService/ReportDefinition';
import _ from 'lodash';
import { ClientReportService } from './AbstractClientReportService';

class KeywordsPerformanceReportService extends ClientReportService implements IClientReportService {
  public static readonly reportName: string = 'Keywords Performance Report';
  private static readonly attributes: string[] = [
    'Id',
    'AdGroupId',
    'AdGroupName',
    'AdGroupStatus',
    'CampaignId',
    'CampaignName',
    'Criteria',
    'Status',
    'CpcBid',
    'FirstPageCpc',
    'TopOfPageCpc',
  ];
  private static readonly segments: string[] = [];
  private static readonly metrics: string[] = [
    'Clicks',
    'Impressions',
    'Ctr',
    'Cost',
    'Conversions',
    'AverageCpc',
    'AveragePosition',
  ];

  private static readonly selectorFields = [
    ...KeywordsPerformanceReportService.attributes,
    ...KeywordsPerformanceReportService.segments,
    ...KeywordsPerformanceReportService.metrics,
  ];

  private reportService: IReportService;
  private constructor(opts: { reportService: IReportService }) {
    super();
    this.reportService = opts.reportService;
  }

  public async get(reportDefinition: Partial<IReportDefinition>) {
    const reportDef: IReportDefinition = {
      // order is matter
      selector: _.get(reportDefinition, 'selector', { fields: KeywordsPerformanceReportService.selectorFields }),
      reportName: KeywordsPerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.KEYWORDS_PERFORMANCE_REPORT,
      dateRangeType: _.get(reportDefinition, 'dateRangeType', ReportDefinition.DateRangeType.ALL_TIME),
    };

    return this.reportService.reportDownload(reportDef);
  }
}

export { KeywordsPerformanceReportService };
