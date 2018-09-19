import _ from 'lodash';
import { pd } from 'pretty-data';
import { RegistryService, IOAuthCredential, IAuthService, AuthService, SoapService, ISoapServiceOpts } from '../core';
import { registryService, IServiceMap } from './registry';

interface IAdWordsServiceOpts {
  clientCustomerId?: string;
  developerToken: string;
  clientId: string;
  clientSecret: string;
  userAgent: string;
  validateOnly?: boolean;
  partialFailure?: boolean;
  credentials: IOAuthCredential;
}

class AdWordsService {
  private xmlns: string = 'https://adwords.google.com/api/adwords/cm/v201809';
  private soapHeader: any;
  private suffix: string = '?wsdl';
  private url: string = '';
  private serviceName: string = '';
  private verbose: boolean = true;
  private registryService: RegistryService<IServiceMap> = registryService;
  private authService: IAuthService;

  constructor(options: IAdWordsServiceOpts) {
    this.soapHeader = {
      RequestHeader: {
        clientCustomerId: options.clientCustomerId,
        developerToken: options.developerToken,
        userAgent: options.userAgent,
        validateOnly: options.validateOnly || false,
        partialFailure: options.partialFailure || false
      }
    };

    this.authService = AuthService.getInstance({
      clientId: options.clientId,
      clientSecret: options.clientSecret,
      refreshToken: options.credentials.refresh_token
    });
  }

  public setVerbose(verbose: boolean) {
    this.verbose = verbose;
  }

  public getService<
    K extends keyof IServiceMap,
    S,
    Opts extends { verbose?: boolean; validateOnly?: boolean; partialFailure?: boolean }
  >(key: K, options?: Opts): IServiceMap[K] {
    const ServiceClass: IServiceMap[K] | undefined = this.registryService.get<K>(key);
    if (!ServiceClass) {
      throw new Error(`Service: ${key} has not been registered yet.`);
    }
    this.serviceName = key;
    this.url = `${this.xmlns}/${this.serviceName}${this.suffix}`;

    let soapServiceOptions: ISoapServiceOpts = {
      authService: this.authService,
      url: this.url,
      serviceName: this.serviceName,
      xmlns: this.xmlns,
      header: this.soapHeader,
      verbose: this.verbose
    };
    if (options) {
      soapServiceOptions = _.merge(soapServiceOptions, options);
    }
    console.log('soapServiceOptions: ', pd.json(soapServiceOptions));
    const soapService = new SoapService(soapServiceOptions);

    return new (ServiceClass as any)(Object.assign({}, options, { soapService }));
  }
}

export { AdWordsService, IAdWordsServiceOpts };
