import request, { OptionsWithUri } from 'request-promise';
import req from 'request';
import _ from 'lodash';
import { CoreOptions } from 'request';
import { IAuthService, IOAuthCredential } from './AuthService';

interface IHttpHeaders {
  clientCustomerId?: string;
  developerToken: string;
  Authorization?: string;
}

interface IHttpServiceOpts {
  headers: IHttpHeaders;
  authService: IAuthService;
}

interface IHttpService {
  request(options: OptionsWithUri): Promise<req.Request>;
}

class HttpService implements IHttpService {
  private headers: IHttpHeaders;
  private authService: IAuthService;
  private readonly defaultOptions: Pick<OptionsWithUri, 'json' | 'timeout' | 'headers'> = {
    timeout: 10 * 1000,
  };
  constructor(opts: IHttpServiceOpts) {
    this.headers = opts.headers;
    this.authService = opts.authService;
  }

  public async request(options: OptionsWithUri): Promise<req.Request> {
    const credentials: IOAuthCredential = await this.authService.refreshCredentials();
    this.headers.Authorization = `Bearer ${credentials.access_token}`;
    const defaultOptions = _.merge(this.defaultOptions, { headers: this.headers });
    const finalOptions: OptionsWithUri = _.defaultsDeep(options, defaultOptions);
    return request(finalOptions);
  }
}

export { HttpService, OptionsWithUri, CoreOptions, IHttpServiceOpts, IHttpHeaders, IHttpService };
