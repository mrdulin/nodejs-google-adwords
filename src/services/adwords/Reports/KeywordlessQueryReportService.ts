import { IReportService, IClientReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService';
import { IReportDefinition } from '../ReportDefinitionService/ReportDefinition';
import _ from 'lodash';
import { ClientReportService } from './AbstractClientReportService';

class KeywordlessQueryReportService extends ClientReportService implements IClientReportService {
  public static readonly reportName: string = 'Keywordless Performance Report';
  private static readonly attributes: string[] = [
    'AdGroupId',
    'AdGroupName',
    'CampaignId',
    'CampaignName',
    'CriterionId',
    'Query',
  ];
  private static readonly segments: string[] = [];
  private static readonly metrics: string[] = ['Clicks', 'Impressions', 'Cost'];

  private static readonly selectorFields = [
    ...KeywordlessQueryReportService.attributes,
    ...KeywordlessQueryReportService.segments,
    ...KeywordlessQueryReportService.metrics,
  ];

  private reportService: IReportService;
  private constructor(opts: { reportService: IReportService }) {
    super();
    this.reportService = opts.reportService;
  }

  public async get(reportDefinition: Partial<IReportDefinition>) {
    const reportDef: IReportDefinition = {
      // order is matter
      selector: _.get(reportDefinition, 'selector', { fields: KeywordlessQueryReportService.selectorFields }),
      reportName: KeywordlessQueryReportService.reportName,
      reportType: ReportDefinition.ReportType.KEYWORDLESS_QUERY_REPORT,
      dateRangeType: _.get(reportDefinition, 'dateRangeType', ReportDefinition.DateRangeType.ALL_TIME),
    };

    return this.reportService.reportDownload(reportDef, this.getOptions());
  }
}

export { KeywordlessQueryReportService };
