import xml2js from 'xml2js';
import { ReportService } from '../../../../services/adwords/ReportService';
import { reportServiceOptsMocked } from '../../../depsMocked';
import { IReportDefinition } from '../../../../services/adwords/ReportDefinitionService/ReportDefinition';
import { ReportDefinition } from '../../../../services/adwords/ReportDefinitionService/enum/ReportDefinition';
import { CampaignPerformanceReportService } from '../../../../services/adwords/Reports';

const reportService = new ReportService(reportServiceOptsMocked);

describe('ReportService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('#buildObjectToXML', () => {
    it('should build object to xml', () => {
      const buildObjectSpy = jest.spyOn(xml2js.Builder.prototype, 'buildObject');
      const reportDefinition: IReportDefinition = {
        selector: {
          fields: ['CampaignId', 'CampaignName', 'CampaignStatus'],
        },
        dateRangeType: ReportDefinition.DateRangeType.ALL_TIME,
        reportName: CampaignPerformanceReportService.reportName,
        reportType: ReportDefinition.ReportType.CAMPAIGN_PERFORMANCE_REPORT,
      };
      // tslint:disable-next-line: no-string-literal
      const actualValue = reportService['buildObjectToXML'](reportDefinition);
      expect(actualValue).toMatchInlineSnapshot(`
        "<?xml version=\\"1.0\\" encoding=\\"UTF-8\\" standalone=\\"yes\\"?>
        <root>
          <selector>
            <fields>CampaignId</fields>
            <fields>CampaignName</fields>
            <fields>CampaignStatus</fields>
          </selector>
          <dateRangeType>ALL_TIME</dateRangeType>
          <reportName>Campaign Performance Report</reportName>
          <reportType>CAMPAIGN_PERFORMANCE_REPORT</reportType>
        </root>"
      `);
      expect(buildObjectSpy).toBeCalledWith(reportDefinition);
    });
  });
});
