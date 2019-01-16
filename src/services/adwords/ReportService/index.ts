import xml2js from 'xml2js';
import _ from 'lodash';
import { pd } from 'pretty-data';

import { HttpService, OptionsWithUri } from '../../core';
import { ISelector } from '../../../types/adwords';
import { ReportDefinition } from '../ReportDefinitionService/enum/ReportDefinition';

interface IReportServiceOpts {
  httpService: HttpService;
}

enum DateRangeType {
  TODAY = 'TODAY',
  YESTERDAY = 'YESTERDAY',
  LAST_7_DAYS = 'LAST_7_DAYS',
  LAST_30_DAYS = 'LAST_30_DAYS',
  ALL_TIME = 'ALL_TIME'
}

enum DownloadFormatType {
  CSV = 'CSV',
  XML = 'XML'
}

interface IReportDefinition {
  selector: ISelector;
  reportName: string;
  reportType: ReportDefinition.ReportType;
  dateRangeType: DateRangeType;
  downloadFormat?: DownloadFormatType;
}

class ReportService {
  public static readonly URL: string = 'https://adwords.google.com/api/adwords/reportdownload/v201809';
  private httpService: HttpService;
  constructor(options: IReportServiceOpts) {
    this.httpService = options.httpService;
  }

  public async reportDownload(reportDefinition: IReportDefinition) {
    const reportDef = _.defaults(reportDefinition, {
      downloadFormat: DownloadFormatType.XML
    });
    const xml = this.buildObjectToXML<{ reportDefinition: IReportDefinition }>({ reportDefinition: reportDef });
    const options: OptionsWithUri = {
      uri: ReportService.URL,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      formData: {
        __rdxml: xml
      }
    };

    return this.httpService
      .request(options)
      .then(rval => {
        console.log('get report successfully. rval: ', pd.xml(rval));
        return rval;
      })
      .catch(error => {
        console.error('get report failed.');
        console.error(error);
      });
  }

  public buildObjectToXML<T>(obj: T) {
    const builder = new xml2js.Builder();
    return builder.buildObject(obj);
  }
}

export { ReportService, IReportDefinition, DateRangeType, DownloadFormatType };
