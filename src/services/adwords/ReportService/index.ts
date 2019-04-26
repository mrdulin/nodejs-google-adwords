import xml2js from 'xml2js';
import _ from 'lodash';
import { pd } from 'pretty-data';

import { HttpService, OptionsWithUri } from '../../core';
import { ReportDefinition } from '../ReportDefinitionService/enum/ReportDefinition';
import { IReportDefinition } from '../ReportDefinitionService/ReportDefinition';
import { XMLService } from '../../core';

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

class ReportService {
  public static readonly URL: string = 'https://adwords.google.com/api/adwords/reportdownload/v201809';

  private httpService: HttpService;
  constructor(options: IReportServiceOpts) {
    this.httpService = options.httpService;
  }

  public async reportDownload(reportDefinition: IReportDefinition, options?: Partial<IReportDownloadOptions>) {
    const reportDef = _.defaults(reportDefinition, {
      downloadFormat: ReportDefinition.DownloadFormatType.XML,
    });
    const xml = this.buildObjectToXML<{ reportDefinition: IReportDefinition }>({ reportDefinition: reportDef });

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
      formData: {
        __rdxml: xml,
      },
    };

    return this.httpService
      .request(requestOptions)
      .then((rval) => {
        console.log(`get ${reportDefinition.reportName} successfully. rval: `, pd.xml(rval));
        return rval;
      })
      .then((rval) => {
        if (options && options.json) {
          return this.xmlParse(rval);
        }
        return rval;
      })
      .catch((error) => {
        console.error(`get ${reportDefinition.reportName} failed.`);
        console.error(error);
      });
  }

  private buildObjectToXML<T>(obj: T) {
    const builder = new xml2js.Builder();
    return builder.buildObject(obj);
  }

  private async xmlParse(xml: string) {
    return XMLService.parseStringPromise(xml);
  }
}

export { ReportService };
