import { adwordsService } from '../../initialize';
import { ReportDefinition } from '../../../../services/adwords/ReportDefinitionService/enum/ReportDefinition';
import { ISelector } from '../../../../types/adwords';

describe('ReportDefinitionService test suites', () => {
  const reportDefinitionService = adwordsService.getService('ReportDefinitionService', {
    verbose: false
  });

  it('#getReportFields', async () => {
    const selector: ISelector = {
      fields: [],
      predicates: []
    };

    const reportDefinition = {
      selector,
      reportName: 'Campaign Performance Report',
      reportType: ReportDefinition.ReportType.CAMPAIGN_PERFORMANCE_REPORT,
      dateRangeType: ''
    };
    const actualValue = await reportDefinitionService.getReportFields(
      ReportDefinition.ReportType.CAMPAIGN_PERFORMANCE_REPORT
    );
  });
});
