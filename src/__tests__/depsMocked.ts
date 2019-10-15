import { IHttpServiceOpts, IAuthService, IHttpHeaders, IHttpService } from '../services/core';
import { IReportServiceOpts, IReportService } from '../services/adwords/ReportService';

export const authServiceMocked: jest.Mocked<IAuthService> = {
  refreshCredentials: jest.fn(),
  getCredentials: jest.fn(),
  setCredentials: jest.fn(),
};

const httpServiceMocked: jest.Mocked<IHttpService> = {
  request: jest.fn(),
};

const httpHeadersMocked: IHttpHeaders = {
  clientCustomerId: '',
  developerToken: '',
  Authorization: '',
};

export const httpServiceOptsMocked: jest.Mocked<IHttpServiceOpts> = {
  authService: authServiceMocked,
  headers: httpHeadersMocked,
};

export const reportServiceOptsMocked: jest.Mocked<IReportServiceOpts> = {
  httpService: httpServiceMocked,
};

export const reportServiceMocked: jest.Mocked<IReportService> = {
  reportDownload: jest.fn(),
  setVerbose: jest.fn(),
};
