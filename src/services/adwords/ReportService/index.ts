import xml2js from 'xml2js';
import _ from 'lodash';
import { pd } from 'pretty-data';

import { HttpService, OptionsWithUri, XMLService } from '../../core';
import { ReportDefinition } from '../ReportDefinitionService/enum/ReportDefinition';
import { IReportDefinition } from '../ReportDefinitionService/ReportDefinition';

interface IReportServiceOpts {
  httpService: HttpService;
}

interface IReportDownloadOptions {
  json: boolean;
  skipReportHeader: boolean;
  skipColumnHeader: boolean;
  skipReportSummary: boolean;
  useRawEnumValues: boolean;
  includeZeroImpressions: boolean;
}

interface IReportDownloadFormData {
  __rdxml: string;
}

interface IReport {
  'report-name': any[];
  'data-range': any[];
  table: any[];
}

class ReportService {
  public static readonly URL: string = 'https://adwords.google.com/api/adwords/reportdownload/v201809';

  private httpService: HttpService;
  constructor(options: IReportServiceOpts) {
    this.httpService = options.httpService;
  }

  public async reportDownload(
    reportDefinition: IReportDefinition,
    options?: Partial<IReportDownloadOptions>,
  ): Promise<IReport | string> {
    const reportDef = _.defaults(reportDefinition, {
      downloadFormat: ReportDefinition.DownloadFormatType.XML,
    });
    const xml = this.buildObjectToXML<{ reportDefinition: IReportDefinition }>({ reportDefinition: reportDef });
    const formData: IReportDownloadFormData = { __rdxml: xml };
    const requestOptions: OptionsWithUri = {
      uri: ReportService.URL,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        skipReportHeader: _.get(options, ['skipReportHeader'], false),
        skipColumnHeader: _.get(options, ['skipColumnHeader'], false),
        skipReportSummary: _.get(options, ['skipReportSummary'], true),
        useRawEnumValues: _.get(options, ['useRawEnumValues'], false),
        includeZeroImpressions: _.get(options, ['includeZeroImpressions'], false),
      },
      formData,
    };

    return this.httpService
      .request(requestOptions)
      .then(
        (rval: string): string => {
          console.log(`get ${reportDefinition.reportName} successfully. rval: `, pd.xml(rval));
          return rval;
        },
      )
      .then(
        (rval: string): Promise<IReport | string> => {
          if (options && options.json) {
            return this.xmlParse(rval).then(
              (rvalJson: { report: IReport }): IReport => {
                const defaultRvalJson: IReport = { table: [], 'data-range': [], 'report-name': [] };
                return _.get(rvalJson, 'report', defaultRvalJson);
              },
            );
          }
          return Promise.resolve(rval);
        },
      )
      .catch((error) => {
        console.error(`get ${reportDefinition.reportName} failed.`);
        console.error(error);
        return '';
      });
  }

  private buildObjectToXML<T>(obj: T): string {
    const builder = new xml2js.Builder();
    return builder.buildObject(obj);
  }

  private async xmlParse<Rval = { report: IReport }>(xml: string): Promise<Rval> {
    return XMLService.parseStringPromise<Rval>(xml);
  }
}

export { ReportService, IReportServiceOpts, IReportDownloadOptions, IReport };
