import { pd } from 'pretty-data';
import { adwordsService } from '../../initialize';
import { ISelector, Predicate } from '../../../../types/adwords';
import { IReportDefinition } from '../../../../services/adwords/ReportDefinitionService/ReportDefinition';

describe('GeoPerformanceReportService test suites', () => {
  const geoPerformanceReportService = adwordsService.getService('GeoPerformanceReportService', {
    verbose: true,
  });
  it.skip('#reportDownload', async () => {
    const actualvalue = await geoPerformanceReportService.get({});
    console.log(pd.xml(actualvalue));
  });

  it('#reportDownload - with predicates', async () => {
    const selector: ISelector = {
      fields: [],
      predicates: [
        {
          field: 'CampaignId',
          operator: Predicate.Operator.IN,
          values: ['1733539359', '1648603100'],
        },
      ],
    };
    const reportDefinition: Partial<IReportDefinition> = {
      selector,
    };
    const actualvalue = await geoPerformanceReportService.get(reportDefinition);
    console.log(pd.xml(actualvalue));
  });
});
