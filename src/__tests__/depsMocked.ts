import { IHttpServiceOpts, IAuthService, IHttpHeaders, IHttpService } from '../services/core';
import { IReportServiceOpts } from '../services/adwords/ReportService';

const authServiceMocked: IAuthService = {
  refreshCredentials: jest.fn(),
  getCredentials: jest.fn(),
  setCredentials: jest.fn(),
};

const httpServiceMocked: IHttpService = {
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
