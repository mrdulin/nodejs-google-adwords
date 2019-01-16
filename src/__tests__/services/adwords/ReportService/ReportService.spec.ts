import { adwordsService } from '../../initialize';
import { IReportDefinition, DateRangeType } from '../../../../services/adwords/ReportService';
import { ReportDefinition } from '../../../../services/adwords/ReportDefinitionService/enum/ReportDefinition';

describe('ReportService test suites', () => {
  const reportService = adwordsService.getService('ReportService', { verbose: true });
  it('#reportDownload', async () => {
    const reportDefinition: IReportDefinition = {
      selector: {
        fields: ['CampaignId', 'CampaignName']
      },
      reportName: 'Campaign Performance Report',
      reportType: ReportDefinition.ReportType.CAMPAIGN_PERFORMANCE_REPORT,
      dateRangeType: DateRangeType.ALL_TIME
    };
    const actualvalue = await reportService.reportDownload(reportDefinition);
  });
});
