import request from 'request-promise';
import { HttpService, IAuthService, IOAuthCredential, OptionsWithUri } from '../../../services/core';
import { httpServiceOptsMocked } from '../../depsMocked';

const httpService = new HttpService(httpServiceOptsMocked);

jest.mock('request-promise', () => jest.fn());

describe('HttpService', () => {
  describe('#request', () => {
    const oauthCredentialMocked: IOAuthCredential = {
      access_token: '123',
      refresh_token: '321',
    };
    const mockedData = 'mocked data';
    const requestOptions: OptionsWithUri = {
      uri: 'https://github.com/mrdulin',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    beforeEach(() => {
      (httpServiceOptsMocked.authService as jest.Mocked<IAuthService>).refreshCredentials.mockReset();
      (request as jest.MockedFunction<typeof request>).mockReset();
    });

    it('should send request correctly', async () => {
      (httpServiceOptsMocked.authService as jest.Mocked<IAuthService>).refreshCredentials.mockResolvedValueOnce(
        oauthCredentialMocked,
      );
      (request as jest.MockedFunction<typeof request>).mockResolvedValueOnce(mockedData);

      const actualValue = await httpService.request(requestOptions);
      expect(actualValue).toBe(mockedData);
      expect(request).toBeCalledWith({
        uri: 'https://github.com/mrdulin',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer 123',
          clientCustomerId: '',
          developerToken: '',
        },
        timeout: 10 * 1000,
      });
    });

    it('should throw an error when auth service refresh credentials failed', async () => {
      const refreshCredentialsError = new Error('some error');
      (httpServiceOptsMocked.authService as jest.Mocked<IAuthService>).refreshCredentials.mockRejectedValueOnce(
        refreshCredentialsError,
      );
      await expect(httpService.request(requestOptions)).rejects.toThrowError(refreshCredentialsError);
      expect(request).not.toBeCalled();
    });
  });
});
