import * as soap from 'soap';
import _ from 'lodash';
import { pd } from 'pretty-data';

import { IAuthService, IOAuthCredential } from './AuthService';
import { ISelector, IOperation, Operator } from '../../types/adwords';
import { AdwordsOperartionService } from './AdwordsOperationService';
import { CoreOptions } from './HttpService';
import { XMLService } from './XMLService';

interface ISoapHeader {
  clientCustomerId?: string;
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
  verbose?: boolean;
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
    this.verbose = options.verbose || false;
    this.gzip = options.gzip || true;
  }

  public setVerbose(val: boolean) {
    this.verbose = val;
  }

  /**
   * enable/disable http request gzip
   *
   * @author dulin
   * @param {boolean} val
   * @memberof SoapService
   */
  public setGzip(gzip: boolean) {
    this.gzip = gzip;
  }

  public setHeader(header: ISoapHeader) {
    this.header = header;
  }

  public async getClient(): Promise<soap.Client> {
    if (this.client) {
      return this.client;
    }
    this.client = await this.beforeSendRequest();
    return this.client;
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
  public async mutateAsync<Operation, Rval>(operations: Operation[], operationType?: string): Promise<Rval> {
    if (!operations.length) {
      throw new Error('operation array is empty');
    }
    const client = await this.beforeSendRequest();
    const request = this.formMutateRequest({ operations, operationType, mutateMethod: 'mutate' });
    const response = await client.mutateAsync(request);
    return this.parseMutateResponse<Rval>(response);
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

  /**
   * mutate label
   *
   * @author dulin
   * @template Operation
   * @template Rval
   * @param {Operation[]} operations
   * @returns {Promise<Rval>}
   * @memberof SoapService
   */
  public async mutateLabelAsync<Operation, Rval>(operations: Operation[], operationType: string): Promise<Rval> {
    const client = await this.beforeSendRequest();
    const request = this.formMutateRequest({ operations, operationType, mutateMethod: 'mutateLabel' });
    const response = await client.mutateLabelAsync(request);
    return this.parseMutateResponse<Rval>(response);
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
    const client = await this.createSoapClient(this.url, credentials);

    return new Promise((resolve, reject) => {
      if (!client) {
        return reject(new Error('soap client does not exist'));
      }
      const request = this.formGetRequest<ServiceSelector>(serviceSelector);
      const requestOptions: CoreOptions = this.formHttpRequestOptions();
      client.get(
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

  private async beforeSendRequest(): Promise<soap.Client> {
    const credentials: IOAuthCredential = await this.authService.refreshCredentials();
    return this.createSoapClient(this.url, credentials);
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

  private formMutateRequest(options: { operationType?: string;[key: string]: any }) {
    const request: { operations: Array<IOperation<any>> } = { operations: [] };
    const mutateMethod = this.description[this.serviceName][`${this.serviceName}InterfacePort`][options.mutateMethod];
    const operations = options.operations;

    if (_.keys(mutateMethod.input).indexOf('operations[]') > -1) {
      _.each(operations, (operation) => {
        operation.operand = this.matchJSONKeyOrder(operation.operand, mutateMethod.input['operations[]'].operand);
        request.operations.push(operation);
      });
    }

    if (options.operationType) {
      request.operations = _.map(request.operations, (operation: IOperation<any>) => {
        operation.attributes = {
          'xsi:type': options.operationType,
        };
        return operation;
      });
    }

    return request;
  }

  /**
   * XML element order matters
   *
   * @author dulin
   * @private
   * @param {*} src
   * @param {*} toMatch
   * @returns
   * @memberof SoapService
   */
  private matchJSONKeyOrder(src: any, toMatch: any) {
    const orderedObj = {};
    const self = this;

    _.mapKeys(toMatch, (v, k): any => {
      // Check and remove [] at the end
      if (typeof k !== 'string') {
        return;
      }
      let canBeMore = false;

      if (k.substr(-2) === '[]') {
        k = k.substr(0, k.length - 2);
        canBeMore = true;
      }

      if (src[k] === undefined) {
        return;
      }

      if (!canBeMore && typeof src[k] === 'object' && typeof v === 'object') {
        orderedObj[k] = self.matchJSONKeyOrder(src[k], v);
      } else if (canBeMore && typeof v === 'object' && _.isArray(src[k])) {
        orderedObj[k] = [];
        _.each(src[k], function (item) {
          orderedObj[k].push(self.matchJSONKeyOrder(item, v));
        });
      } else {
        orderedObj[k] = src[k];
      }
    });

    // Add keys not present in toMatch object, at the end
    const currentKeys = _.keys(orderedObj);
    _.mapKeys(src, (v, k): any => {
      if (currentKeys.indexOf(k) === -1) {
        orderedObj[k] = src[k];
      }
    });

    return orderedObj;
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
  private async createSoapClient(url: string, credentials: IOAuthCredential): Promise<soap.Client> {
    if (!credentials.access_token) {
      throw new Error('access_token required.');
    }

    try {
      this.client = await soap.createClientAsync(url, {});
      this.client.addSoapHeader({ RequestHeader: this.header }, this.serviceName, this.namespace, this.xmlns);
      this.client.setSecurity(new soap.BearerSecurity(credentials.access_token));
      this.description = this.client.describe();
      return this.listenSoapClientEvents(this.client);
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
   * https://developers.google.com/adwords/api/docs/guides/call-structure#response_headers
   *
   * @author dulin
   * @private
   * @memberof SoapService
   */
  private listenSoapClientEvents(client: soap.Client): soap.Client {
    if (!client) {
      throw new Error('soap client is required');
    }
    client.on('request', (xml: string, eid: string) => {
      if (this.verbose) {
        console.log('Soap request (Envelope) including headers: ', pd.xml(xml));
        console.log('Soap request exchange id: ', eid);
      }
    });
    client.on('soapError', (error: any, eid: string) => {
      if (this.verbose) {
        console.error(error);
      }
    });
    client.on('response', (body: any, response: any, eid: string) => {
      if (this.verbose) {
        console.log('Soap response body: ', pd.xml(body));
        console.log('Soap response: ', pd.json(response));
      }

      const operations: string | undefined = XMLService.extractValueFromElement(body, 'operations');
      const responseTime: string | undefined = XMLService.extractValueFromElement(body, 'responseTime');
      let message = `Soap requestId: ${eid}`;
      message += operations ? `, operations: ${operations}` : '';
      message += responseTime ? `, responseTime: ${responseTime}ms` : '';
      console.log(message);
    });
    return client;
  }
}

export { SoapService, ISoapServiceOpts, IResponse, SoapClient, ISoapHeader };
