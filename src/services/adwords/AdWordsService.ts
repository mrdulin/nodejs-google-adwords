import _ from 'lodash';
import { pd } from 'pretty-data';
import { RegistryService, IOAuthCredential, IAuthService, AuthService, SoapService, ISoapServiceOpts } from '../core';
import { registryService, IServiceMap } from './registry';
import { version } from 'bluebird';

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
  public static readonly namespace: string = 'https://adwords.google.com/api/adwords/cm';
  public static readonly version: string = 'v201809';
  public static readonly suffix: string = '?wsdl';
  private registryService: RegistryService<IServiceMap> = registryService;
  private authService: IAuthService;
  private verbose: boolean = true;
  private soapHeader: any;

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

  /**
   * get each google adwords service: CampaignService, AdGroupService, BudgetService etc...
   *
   * @author dulin
   * @template K
   * @template Opts
   * @param {K} key
   * @param {Opts} [options]
   * @returns {IServiceMap[K]}
   * @memberof AdWordsService
   */
  public getService<
    K extends keyof IServiceMap,
    Opts extends { verbose?: boolean; validateOnly?: boolean; partialFailure?: boolean; version?: string }
  >(key: K, options?: Opts): IServiceMap[K] {
    const ServiceClass: IServiceMap[K] | undefined = this.registryService.get<K>(key);
    if (!ServiceClass) {
      throw new Error(`Service: ${key} has not been registered yet.`);
    }
    const serviceName = key;
    let ver = AdWordsService.version;
    if (options && options.version) {
      ver = options.version;
    }
    const xmlns = `${AdWordsService.namespace}/${ver}`;
    const url = `${xmlns}/${serviceName}${AdWordsService.suffix}`;

    let soapServiceOptions: ISoapServiceOpts = {
      authService: this.authService,
      header: this.soapHeader,
      verbose: this.verbose,
      url,
      serviceName,
      xmlns
    };
    if (options) {
      soapServiceOptions = _.merge(soapServiceOptions, options);
    }
    if (this.verbose) {
      console.log('soapServiceOptions: ', pd.json(soapServiceOptions));
    }
    const soapService = new SoapService(soapServiceOptions);

    return new (ServiceClass as any)(Object.assign({}, options, { soapService }));
  }
}

export { AdWordsService, IAdWordsServiceOpts };
