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
  IHttpServiceOpts,
  IHttpService,
} from '../core';
import { registryService, IServiceMap } from './registry';
import { ReportService, IReportService } from './ReportService';

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

interface IServiceOpts {
  verbose: boolean;
  validateOnly: boolean;
  partialFailure: boolean;
  version: string;
  gzip: boolean;
  clientCustomerId?: string;
}

interface IServiceDeps {
  soapService: typeof SoapService;
  httpService: IHttpService;
  reportService: IReportService;
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
      partialFailure: options.partialFailure || false,
    };

    this.authService = AuthService.getInstance({
      clientId: options.clientId,
      clientSecret: options.clientSecret,
    });
    this.authService.setCredentials(options.credentials);
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
   * @param {Partial<IServiceOpts & IServiceDeps>} [options]
   * @returns {IServiceMap[K]}
   * @memberof AdWordsService
   */
  public getService<K extends keyof IServiceMap>(
    key: K,
    options?: Partial<IServiceOpts & IServiceDeps>,
  ): IServiceMap[K] {
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

    this.soapHeader.clientCustomerId = options ? options.clientCustomerId : this.soapHeader.clientCustomerId;
    this.soapHeader.partialFailure = !!(options ? options.partialFailure : this.soapHeader.partialFailure);
    let soapServiceOptions: ISoapServiceOpts = {
      authService: this.authService,
      header: this.soapHeader,
      verbose,
      url,
      serviceName,
      xmlns,
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
        developerToken: this.soapHeader.developerToken,
      },
      authService: this.authService,
    };
    const httpService = new HttpService(httpServiceOpts);
    const reportService = new ReportService({ httpService });

    return new (ServiceClass as any)(Object.assign({}, { soapService, httpService, reportService }, options));
  }
}

export { AdWordsService, IAdWordsServiceOpts };
