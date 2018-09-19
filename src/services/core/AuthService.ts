import { HttpService, OptionsWithUri } from './HttpService';
import { pd } from 'pretty-data';

import { Omit } from '../../models/core';

interface IOAuthCredential {
  access_token?: string;
  expires_in?: number;
  refresh_token: string;
  scope?: string;
  token_type?: string;
}

interface IOAuthRefreshedCredential extends Required<Omit<IOAuthCredential, 'refresh_token'>> {}

interface IAuthServiceOpts {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

interface IAuthService {
  refreshCredentials(): Promise<IOAuthRefreshedCredential>;
}

interface IAuthServiceClass {
  new (): IAuthService;
  getInstance(options: IAuthServiceOpts): IAuthService;
}

class AuthService implements IAuthService {
  public static getInstance(options: IAuthServiceOpts) {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AuthService(options);
    return this.instance;
  }
  private static instance: AuthService;
  private httpService: HttpService;

  private readonly authURL: string = 'https://www.googleapis.com/oauth2/v4/token';
  private clientId: string;
  private clientSecret: string;
  private refreshToken: string;

  private constructor(options: IAuthServiceOpts) {
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.refreshToken = options.refreshToken;
    this.httpService = new HttpService();
  }
  public async refreshCredentials(): Promise<IOAuthRefreshedCredential> {
    const options: OptionsWithUri = {
      uri: this.authURL,
      method: 'POST',
      body: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: this.refreshToken,
        grant_type: 'refresh_token'
      }
    };

    return this.httpService
      .request(options)
      .then(response => {
        console.log('refresh token success. response: ', pd.json(response));
        return response;
      })
      .catch(error => {
        console.error(error.message);
        return Promise.reject(new Error('refresh token failed.'));
      });
  }
}

export { AuthService, IOAuthCredential, IOAuthRefreshedCredential, IAuthServiceOpts, IAuthServiceClass, IAuthService };
