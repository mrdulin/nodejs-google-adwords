import _ from 'lodash';
import { pd } from 'pretty-data';
import {
  RegistryService,
  IOAuthCredential,
  IAuthService,
  AuthService,
  SoapService,
  ISoapServiceOpts,
  ISoapHeader,
  HttpService,
  IHttpServiceOpts
} from '../core';
import { registryService, IServiceMap } from './registry';
import { OptionalUriUrl } from 'request';

interface IAdWordsServiceOpts {
  clientCustomerId: string;
  developerToken: string;
  clientId: string;
  clientSecret: string;
  userAgent: string;
  validateOnly?: boolean;
  partialFailure?: boolean;
  credentials: IOAuthCredential;
}

interface IServiceOpts {
  verbose: boolean;
  validateOnly: boolean;
  partialFailure: boolean;
  version: string;
  gzip: boolean;
  clientCustomerId: string;
}

class AdWordsService {
  public static readonly namespace: string = 'https://adwords.google.com/api/adwords/cm';
  public static readonly version: string = 'v201809';
  public static readonly suffix: string = '?wsdl';
  private registryService: RegistryService<IServiceMap> = registryService;
  private authService: IAuthService;
  private verbose: boolean = true;
  private soapHeader: ISoapHeader;

  constructor(options: IAdWordsServiceOpts) {
    this.soapHeader = {
      clientCustomerId: options.clientCustomerId,
      developerToken: options.developerToken,
      userAgent: options.userAgent,
      validateOnly: options.validateOnly || false,
      partialFailure: options.partialFailure || false
    };

    this.authService = AuthService.getInstance({
      clientId: options.clientId,
      clientSecret: options.clientSecret,
      credentials: options.credentials
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
   * @param {K} key
   * @param {Partial<IServiceOpts>} [options]
   * @returns {IServiceMap[K]}
   * @memberof AdWordsService
   */
  public getService<K extends keyof IServiceMap>(key: K, options?: Partial<IServiceOpts>): IServiceMap[K] {
    const ServiceClass: IServiceMap[K] | undefined = this.registryService.get<K>(key);
    if (!ServiceClass) {
      throw new Error(`Service: ${key} has not been registered yet.`);
    }
    const serviceName = key;
    const ver = _.get(options, ['version'], AdWordsService.version);
    const namespace = _.get(options, ['namespace'], _.get(ServiceClass, ['namespace'], AdWordsService.namespace));
    const xmlns = `${namespace}/${ver}`;
    const url = `${xmlns}/${serviceName}${AdWordsService.suffix}`;
    const verbose = _.get(options, ['verbose'], this.verbose);

    this.soapHeader.clientCustomerId = _.get(options, ['clientCustomerId'], this.soapHeader.clientCustomerId);
    let soapServiceOptions: ISoapServiceOpts = {
      authService: this.authService,
      header: this.soapHeader,
      verbose,
      url,
      serviceName,
      xmlns
    };
    if (options) {
      soapServiceOptions = _.merge(soapServiceOptions, options);
    }
    if (verbose) {
      console.log('soapServiceOptions: ', pd.json(soapServiceOptions));
    }
    const soapService = new SoapService(soapServiceOptions);
    const httpServiceOpts: IHttpServiceOpts = {
      headers: {
        clientCustomerId: this.soapHeader.clientCustomerId,
        developerToken: this.soapHeader.developerToken
      },
      authService: this.authService,
      verbose
    };
    const httpService = new HttpService(httpServiceOpts);

    return new (ServiceClass as any)(Object.assign({}, options, { soapService, httpService }));
  }
}

export { AdWordsService, IAdWordsServiceOpts };
