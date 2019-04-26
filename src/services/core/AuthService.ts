import { pd } from 'pretty-data';
import _ from 'lodash';
import moment from 'moment';
import request, { OptionsWithUri } from 'request-promise';
import { Omit } from '../../types/core';

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
  credentials: IOAuthCredential;
}

interface IAuthService {
  refreshCredentials(): Promise<IOAuthCredential>;
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

  private readonly authURL: string = 'https://www.googleapis.com/oauth2/v4/token';
  private clientId: string;
  private clientSecret: string;
  private credentials: IOAuthCredential;
  private tokenExpiresInMs: number = 0;

  constructor(options: IAuthServiceOpts) {
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.credentials = options.credentials;
  }
  public async refreshCredentials(): Promise<IOAuthCredential> {
    if (Date.now() <= this.tokenExpiresInMs && this.credentials.access_token) {
      return Promise.resolve(this.credentials);
    }
    const options: OptionsWithUri = {
      uri: this.authURL,
      method: 'POST',
      body: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: this.credentials.refresh_token,
        grant_type: 'refresh_token',
      },
      json: true,
    };

    return request(options)
      .then((response) => {
        console.log('refresh token success. response: ', pd.json(response));
        this.tokenExpiresInMs = moment()
          .add(1, 'hour')
          .toDate()
          .getTime();
        this.credentials = _.defaults(response, this.credentials);
        return response;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(new Error('refresh token failed.'));
      });
  }
}

export { AuthService, IOAuthCredential, IOAuthRefreshedCredential, IAuthServiceOpts, IAuthServiceClass, IAuthService };
