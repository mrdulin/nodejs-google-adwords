import { pd } from 'pretty-data';
import { adwordsService } from '../../../initialize';
import { IReportDefinition } from '../../../../services/adwords/ReportDefinitionService/ReportDefinition';
import { Predicate } from '../../../../types/adwords';

describe('AdPerformanceReportService test suites', () => {
  const adPerformanceReportService = adwordsService.getService('AdPerformanceReportService', {
    verbose: true,
  });
  it.skip('#reportDownload', async () => {
    const actualvalue = await adPerformanceReportService.get({});
    console.log(pd.xml(actualvalue));
  });

  it('with selector', async () => {
    const reportDefinition: Partial<IReportDefinition> = {
      selector: {
        fields: [
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
        ],
        predicates: [
          {
            field: 'CampaignId',
            operator: Predicate.Operator.IN,
            values: [
              '1952851832', // normal campaign
              '1648603100', // campaign status: ended
              '1742654618', // campaign status: removed
            ],
          },
        ],
      },
    };
    const actualvalue = await adPerformanceReportService.get(reportDefinition);
    console.log(pd.xml(actualvalue));
  });
});
