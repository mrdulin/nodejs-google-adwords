import { ReportService } from '../../../../services/adwords/ReportService';
import { reportServiceOptsMocked } from '../../../depsMocked';
import { IHttpService } from '../../../../services/core';

const reportService = new ReportService(reportServiceOptsMocked);

describe('ReportService', () => {
  describe.skip('#reportDownload', () => {});
});
