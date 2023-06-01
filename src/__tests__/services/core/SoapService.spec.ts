import * as soap from 'soap';

import { SoapService, ISoapServiceOpts, IAuthService, IOAuthCredential, ISoapHeader } from '../../../services/core';
import { authServiceMocked } from '../../depsMocked';
import { ISelector } from '../../../types/adwords';

type SoapClient = any;

const mockedSoapClient = {
  addSoapHeader: jest.fn(),
  setSecurity: jest.fn(),
  describe: jest.fn(),
  on: jest.fn(),
};

jest.mock('soap', () => {
  return {
    createClientAsync: jest.fn(),
    BearerSecurity: jest.fn(),
  };
});

const mockedHeader: ISoapHeader = {
  clientCustomerId: '',
  developerToken: '',
  userAgent: '',
  validateOnly: true,
  partialFailure: true,
};

const mockOptions: jest.Mocked<ISoapServiceOpts> = {
  authService: authServiceMocked,
  url: 'https://github.com/mrdulin?wsdl',
  serviceName: 'CampaignService',
  xmlns: 'xmlns:',
  header: mockedHeader,
};

const soapService = new SoapService(mockOptions);

describe('SoapService', () => {
  beforeEach(() => {
    (mockOptions.authService as jest.Mocked<IAuthService>).refreshCredentials.mockReset();
  });
  describe('#beforeSendRequest', () => {
    it('should return soap client', async () => {
      const credentials: IOAuthCredential = { refresh_token: '123' };
      (mockOptions.authService as jest.Mocked<IAuthService>).refreshCredentials.mockResolvedValueOnce(credentials);
      const createSoapClientSpy = jest.spyOn(soapService as any, 'createSoapClient').mockResolvedValueOnce({});
      // tslint:disable-next-line: no-string-literal
      const soapClient = await soapService['beforeSendRequest']();
      expect(soapClient).toEqual({});
      expect((mockOptions.authService as jest.Mocked<IAuthService>).refreshCredentials).toBeCalledTimes(1);
      expect(createSoapClientSpy).toBeCalledTimes(1);
      createSoapClientSpy.mockRestore();
    });
  });

  describe('#getClient', () => {
    it('should return soap client created before', async () => {
      const beforeSendRequestSpy = jest.spyOn(soapService as any, 'beforeSendRequest');
      // tslint:disable-next-line: no-string-literal
      soapService['client'] = {} as any;
      const [client1, client2] = await Promise.all([soapService.getClient(), soapService.getClient()]);
      expect(client1).toBe(client2);
      expect(beforeSendRequestSpy).toBeCalledTimes(0);
      // tslint:disable-next-line: no-string-literal
      soapService['client'] = undefined;
      beforeSendRequestSpy.mockRestore();
    });

    it('should create and return soap client', async () => {
      const beforeSendRequestSpy = jest.spyOn(soapService as any, 'beforeSendRequest').mockResolvedValue({});
      const client1 = await soapService.getClient();
      const client2 = await soapService.getClient();
      expect(client1).toBe(client2);
      expect(beforeSendRequestSpy).toBeCalledTimes(1);
      beforeSendRequestSpy.mockRestore();
    });
  });

  describe('#createSoapClient', () => {
    it('should create soap client correctly', async () => {
      const mockedCredentials: IOAuthCredential = { refresh_token: '1', access_token: '2' };
      (soap.createClientAsync as jest.MockedFunction<typeof soap.createClientAsync>).mockResolvedValueOnce(
        mockedSoapClient as SoapClient,
      );
      // tslint:disable-next-line: no-string-literal
      const listenSoapClientEventsSpy = jest.spyOn(soapService as any, 'listenSoapClientEvents');
      mockedSoapClient.describe.mockReturnValueOnce({});

      // tslint:disable-next-line: no-string-literal
      const soapClient: SoapClient = await soapService['createSoapClient']('', mockedCredentials);
      expect(soapClient.addSoapHeader).toBeCalledWith(
        { RequestHeader: mockOptions.header },
        mockOptions.serviceName,
        // tslint:disable-next-line: no-string-literal
        soapService['namespace'],
        mockOptions.xmlns,
      );
      expect(soapClient.setSecurity).toBeCalledWith(new soap.BearerSecurity(mockedCredentials.access_token as string));
      expect(mockedSoapClient.describe).toBeCalledTimes(1);
      expect(listenSoapClientEventsSpy).toBeCalledWith(soapClient);
      listenSoapClientEventsSpy.mockRestore();
    });

    it('should throw an error when access token not pass', async () => {
      const mockedCredentials: IOAuthCredential = { refresh_token: '1' };
      // tslint:disable-next-line: no-string-literal
      await expect(soapService['createSoapClient']('', mockedCredentials)).rejects.toThrowError(
        new Error('access_token required.'),
      );
    });

    it('should throw an error when crewate soap client', async () => {
      const createClientAsyncError = new Error('some error message');
      const mockedCredentials: IOAuthCredential = { refresh_token: '1', access_token: '2' };
      (soap.createClientAsync as jest.MockedFunction<typeof soap.createClientAsync>).mockRejectedValueOnce(
        createClientAsyncError,
      );
      const errorSpy = jest.spyOn(console, 'error').mockImplementation()
      // tslint:disable-next-line: no-string-literal
      await expect(soapService['createSoapClient']('', mockedCredentials)).rejects.toThrowError(
        new Error('create soap client failed.'),
      );
      expect(errorSpy).toBeCalledWith(createClientAsyncError);
      errorSpy.mockRestore();
    });
  });

  describe('#formGetRequest', () => {
    const serviceSelector: ISelector = {
      fields: [],
    };
    it('should form get request correctly when get input has selector property', () => {
      // tslint:disable-next-line: no-string-literal
      soapService['description'] = {
        CampaignService: { CampaignServiceInterfacePort: { get: { input: { selector: { fields: [] } } } } },
      };
      // tslint:disable-next-line: no-string-literal
      const actualValue = soapService['formGetRequest'](serviceSelector);
      expect(actualValue).toEqual({ selector: serviceSelector });
    });

    it('should form get request correctly when get input has serviceSelector property', () => {
      // tslint:disable-next-line: no-string-literal
      soapService['description'] = {
        CampaignService: { CampaignServiceInterfacePort: { get: { input: { serviceSelector: {} } } } },
      };
      // tslint:disable-next-line: no-string-literal
      const actualValue = soapService['formGetRequest'](serviceSelector);
      expect(actualValue).toEqual({ serviceSelector });
    });
  });

  describe('#formHttpRequestOptions', () => {
    it('should form http request option correctly with gzip enabled', () => {
      const header: ISoapHeader = Object.assign({}, mockedHeader);
      header.userAgent = 'mrdulin';
      soapService.setGzip(true);
      soapService.setHeader(header);

      // tslint:disable-next-line: no-string-literal
      const actualValue = soapService['formHttpRequestOptions']();
      expect(actualValue).toEqual({
        headers: { Connection: 'keep-alive', 'User-Agent': 'mrdulin (gzip)', 'Accept-Encoding': 'gzip' },
        gzip: true,
      });
    });

    it('should form http request option correctly with gzip disabled', () => {
      const header: ISoapHeader = Object.assign({}, mockedHeader);
      header.userAgent = 'mrdulin';
      soapService.setGzip(false);
      soapService.setHeader(header);

      // tslint:disable-next-line: no-string-literal
      const actualValue = soapService['formHttpRequestOptions']();
      expect(actualValue).toEqual({
        headers: { Connection: 'keep-alive' },
        gzip: false,
      });
    });
  });
});
