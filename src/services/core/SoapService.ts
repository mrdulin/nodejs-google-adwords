import soap from 'soap';
import _ from 'lodash';
import { pd } from 'pretty-data';

import { IAuthService, IOAuthCredential } from './AuthService';
import { ISelector } from '../../types/adwords';
import { AdwordsOperartionService } from './AdwordsOperationService';
import { CoreOptions } from './HttpService';

interface ISoapHeader {
  clientCustomerId: string;
  developerToken: string;
  userAgent: string;
  validateOnly: boolean;
  partialFailure: boolean;
}
interface ISoapServiceOpts {
  authService: IAuthService;
  url: string;
  serviceName: string;
  xmlns: string;
  header: ISoapHeader;
  verbose: boolean;
  gzip?: boolean;
}

interface IGetInput {
  selector?: ISelector;
  serviceSelector?: ISelector;
}

interface IResponse<Rval> {
  rval: Rval;
}

type SoapClient = soap.Client;

class SoapService extends AdwordsOperartionService {
  private url: string;
  private authService: IAuthService;
  private client: soap.Client | undefined;
  private header: ISoapHeader;
  private verbose: boolean = false;
  private serviceName: string;
  private namespace: string = 'ns1';
  private description: any;
  private xmlns: string;
  private gzip: boolean;

  constructor(options: ISoapServiceOpts) {
    super();
    this.authService = options.authService;
    this.url = options.url;
    this.serviceName = options.serviceName;
    this.xmlns = options.xmlns;
    this.header = options.header;
    this.verbose = options.verbose;
    this.gzip = options.gzip || true;
  }

  public setVerbose(val: boolean) {
    this.verbose = val;
  }

  public async getClient(): Promise<soap.Client> {
    if (this.client) {
      return this.client;
    }
    return await this.beforeSendRequest();
  }

  /**
   * mutate operation
   *
   * @author dulin
   * @template Operation
   * @template Response
   * @param {Operation[]} operations
   * @returns {Promise<Response>}
   * @memberof SoapService
   */
  public async mutateAsync<Operation, Rval>(operations: Operation[]): Promise<Rval> {
    try {
      const client = await this.beforeSendRequest();
      const response = await client.mutateAsync({ operations });
      return this.parseMutateResponse<Rval>(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * parse mutate response
   *
   * @author dulin
   * @template Response
   * @param {Response} response
   * @returns
   * @memberof SoapService
   */
  public parseMutateResponse<Rval>(response: IResponse<Rval>) {
    return _.get(response, [0, 'rval'], {});
  }

  public async mutateLabelAsync<Operation, Rval>(operations: Operation[]): Promise<Rval> {
    try {
      const client = await this.beforeSendRequest();
      const response = await client.mutateLabelAsync({ operations });
      return this.parseMutateResponse<Rval>(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * get operation
   *
   * @author dulin
   * @template ServiceSelector
   * @template Rval
   * @param {ServiceSelector} serviceSelector
   * @returns {Promise<Rval>}
   * @memberof SoapService
   */
  public async get<ServiceSelector, Rval>(serviceSelector: ServiceSelector): Promise<Rval | undefined> {
    const credentials: IOAuthCredential = await this.authService.refreshCredentials();
    await this.createSoapClient(this.url, credentials);

    return new Promise<Rval>((resolve, reject) => {
      if (!this.client) {
        return reject(new Error('soap client does not exist'));
      }
      const request = this.formGetRequest<ServiceSelector>(serviceSelector);
      const requestOptions: CoreOptions = this.formHttpRequestOptions();
      this.client.get(
        request,
        (error: Error, response: IResponse<Rval>) => {
          if (error) {
            return reject(error);
          }
          const rval = this.parseGetResponse<Rval>(response);
          resolve(rval);
        },
        requestOptions,
      );
    });
  }

  /**
   * parse get response
   *
   * @author dulin
   * @template Rval
   * @param {IResponse<Rval>} response
   * @returns {(Rval | undefined)}
   * @memberof SoapService
   */
  public parseGetResponse<Rval>(response: IResponse<Rval>): Rval | undefined {
    return _.get(response, ['rval'], undefined);
  }

  /**
   * enable/disable http request gzip
   *
   * @author dulin
   * @param {boolean} val
   * @memberof SoapService
   */
  public enableGzip(val: boolean) {
    this.gzip = val;
  }

  private async beforeSendRequest(): Promise<soap.Client> {
    const credentials: IOAuthCredential = await this.authService.refreshCredentials();
    await this.createSoapClient(this.url, credentials);

    if (!this.client) {
      throw new Error('soap client does not exist');
    }

    return this.client;
  }

  /**
   * form get parameter
   * https://github.com/mrdulin/nodejs-google-adwords/issues/2
   *
   * @author dulin
   * @private
   * @template T
   * @param {T} serviceSelector
   * @returns
   * @memberof SoapService
   */
  private formGetRequest<T>(serviceSelector: T) {
    const getInput: IGetInput = _.get(
      this.description,
      [this.serviceName, `${this.serviceName}InterfacePort`, 'get', 'input'],
      {},
    );
    let parameter = {};
    if (getInput.selector) {
      parameter = { selector: serviceSelector };
    } else if (getInput.serviceSelector) {
      parameter = { serviceSelector };
    }
    return parameter;
  }

  private formMutateLabelRequest<Operation>(operations: Operation[]) {
    const mutateLabelInput: { 'operation[]': Operation } = _.get(
      this.description,
      [this.serviceName, `${this.serviceName}InterfacePort`, 'mutateLabel', 'input'],
      {},
    );
    const operationsDefinition = _.get(mutateLabelInput, ['operations[]'], {});
    const operandDefinition = operationsDefinition.operand;
    // TODO: support multiple operations

    if (operandDefinition) {
      const operand = _.get(operations, [0, 'operand'], undefined);
      if (operand) {
        //
      }
    }
  }

  /**
   * create soap client
   *
   * @author dulin
   * @private
   * @param {string} url
   * @param {IOAuthRefreshedCredential} credentials
   * @returns {Promise<void>}
   * @memberof SoapService
   */
  private async createSoapClient(url: string, credentials: IOAuthCredential): Promise<void> {
    try {
      this.client = await soap.createClientAsync(url, {});
      this.client.addSoapHeader({ RequestHeader: this.header }, this.serviceName, this.namespace, this.xmlns);
      if (!credentials.access_token) {
        throw new Error('access_token required.');
      }
      this.client.setSecurity(new soap.BearerSecurity(credentials.access_token));
      this.description = this.client.describe();
      this.listenSoapClientEvents();
    } catch (error) {
      console.error(error);
      throw new Error('create soap client failed.');
    }
  }

  /**
   * form http request core options
   *
   * gzip compress
   * https://developers.google.com/adwords/api/docs/guides/bestpractices#use_compression
   * For backwards-compatibility, response compression is not supported by default. To accept gzip-compressed responses, set the gzip option to true
   *
   * @author dulin
   * @private
   * @returns {CoreOptions}
   * @memberof SoapService
   */
  private formHttpRequestOptions(): CoreOptions {
    const options: CoreOptions = {
      headers: {
        Connection: 'keep-alive',
      },
      gzip: this.gzip,
    };
    if (this.gzip && options.headers) {
      options.headers['User-Agent'] = `${this.header.userAgent} (gzip)`;
      options.headers['Accept-Encoding'] = 'gzip';
    }
    return options;
  }

  /**
   * handle soap client events
   *
   * @author dulin
   * @private
   * @memberof SoapService
   */
  private listenSoapClientEvents(): void {
    if (this.client) {
      this.client.on('request', (xml: string, eid: string) => {
        if (this.verbose) {
          console.log('Soap request (Envelope) including headers: ', pd.xml(xml));
          console.log('Soap request exchange id: ', eid);
        }
      });
      this.client.on('message', (xml: string, eid: string) => {
        if (this.verbose) {
          console.log('Soap body contents: ', pd.xml(xml));
        }
      });
      this.client.on('soapError', (error: any, eid: string) => {
        if (this.verbose) {
          console.error(error);
        }
      });
      this.client.on('response', (body: any, response: any, eid: string) => {
        if (this.verbose) {
          console.log('Soap response body: ', pd.xml(body));
          console.log('Soap response: ', pd.json(response));
          console.log('Soap response eid: ', eid);
        }
      });
    }
  }
}

export { SoapService, ISoapServiceOpts, IResponse, SoapClient, ISoapHeader };
