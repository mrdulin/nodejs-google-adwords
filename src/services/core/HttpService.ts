import request, { OptionsWithUri } from 'request-promise';
import _ from 'lodash';
import { CoreOptions } from 'request';
import { IAuthService } from './AuthService';

interface IHttpHeaders {
  clientCustomerId: string;
  developerToken: string;
  Authorization?: string;
}

interface IHttpServiceOpts {
  headers: IHttpHeaders;
  authService: IAuthService;
  verbose: boolean;
}
class HttpService {
  private headers: IHttpHeaders;
  private authService: IAuthService;
  private readonly defaultOptions: Pick<OptionsWithUri, 'json' | 'timeout' | 'headers'> = {
    timeout: 10 * 1000
  };
  private verbose: boolean = false;
  constructor(opts: IHttpServiceOpts) {
    this.headers = opts.headers;
    this.authService = opts.authService;
    this.verbose = opts.verbose;
  }

  public async request(options: OptionsWithUri) {
    try {
      const credentials = await this.authService.refreshCredentials();
      this.headers.Authorization = `Bearer ${credentials.access_token}`;
      const defaultOptions = _.merge(this.defaultOptions, { headers: this.headers });
      const finalOptions: OptionsWithUri = _.defaultsDeep(options, defaultOptions);
      return await request(finalOptions);
    } catch (error) {
      throw error;
    }
  }
}

export { HttpService, OptionsWithUri, CoreOptions, IHttpServiceOpts };
