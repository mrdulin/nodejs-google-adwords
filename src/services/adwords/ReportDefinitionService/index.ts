import _ from 'lodash';
import { pd } from 'pretty-data';

import { SoapService, SoapClient, IResponse } from '../../core';
import { IReportDefinitionField } from './ReportDefinitionField';
import { ReportDefinition } from './enum/ReportDefinition';

interface IReportDefinitionServiceOpts {
  soapService: SoapService;
}

/**
 * https://developers.google.com/adwords/api/docs/reference/v201809/ReportDefinitionService
 *
 * @author dulin
 * @class ReportDefinitionService
 */
class ReportDefinitionService {
  private soapService: SoapService;
  constructor(opts: IReportDefinitionServiceOpts) {
    this.soapService = opts.soapService;
  }

  /**
   * https://developers.google.com/adwords/api/docs/reference/v201809/ReportDefinitionService#getreportfields
   *
   * @author dulin
   * @param {ReportDefinition.ReportType} reportType
   * @returns
   * @memberof ReportDefinitionService
   */
  public async getReportFields(reportType: ReportDefinition.ReportType) {
    return this.soapService
      .getClient()
      .then((client: SoapClient) => client.getReportFieldsAsync({ reportType }))
      .then(this.parseResponse);
  }

  private parseResponse(response: IResponse<IReportDefinitionField[]>): IReportDefinitionField[] {
    return _.get(response, [0, 'rval'], []);
  }
}

export { ReportDefinitionService, IReportDefinitionField, ReportDefinition };
