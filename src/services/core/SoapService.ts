import * as soap from 'soap';
import _ from 'lodash';
import { pd } from 'pretty-data';

import { IOAuthRefreshedCredential, IAuthService } from './AuthService';
import { ISelector } from '../../models/adwords';
import { AdwordsOperartionService } from './AdwordsOperationService';

interface ISoapServiceOpts {
  authService: IAuthService;
  url: string;
  serviceName: string;
  xmlns: string;
  header: any;
  verbose: boolean;
}

interface IGetInput {
  selector?: ISelector;
  serviceSelector?: ISelector;
}

interface IResponse<Rval> {
  rval: Rval;
}

class SoapService extends AdwordsOperartionService {
  private url: string;
  private authService: IAuthService;
  private client: soap.Client | undefined;
  private header: any;
  private verbose: boolean = false;
  private serviceName: string;
  private namespace: string = 'ns1';
  private description: any;
  private xmlns: string;
  constructor(options: ISoapServiceOpts) {
    super();
    this.authService = options.authService;
    this.url = options.url;
    this.serviceName = options.serviceName;
    this.xmlns = options.xmlns;
    this.header = options.header;
    this.verbose = options.verbose;
  }

  public setVerbose(val: boolean) {
    this.verbose = val;
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
  public async mutateAsync<Operation, Response>(operations: Operation[]): Promise<Response> {
    const credentials: IOAuthRefreshedCredential = await this.authService.refreshCredentials();
    await this.createSoapClient(this.url, credentials);

    if (!this.client) {
      throw new Error('soap client does not exist');
    }

    try {
      const response = await this.client.mutateAsync({ operations });
      console.log('response: ', response);
      return this.parseMutateResponse(response);
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
  public parseMutateResponse<Response>(response: Response) {
    return _.get(response, [0], {});
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
    const credentials: IOAuthRefreshedCredential = await this.authService.refreshCredentials();
    await this.createSoapClient(this.url, credentials);

    return new Promise<Rval>((resolve, reject) => {
      if (!this.client) {
        return reject(new Error('soap client does not exist'));
      }
      const parameter = this.formGetParameter<ServiceSelector>(serviceSelector);
      this.client.get(parameter, (error: Error, response: IResponse<Rval>) => {
        if (error) {
          return reject(error);
        }
        const rval = this.parseGetResponse<Rval>(response);
        resolve(rval);
      });
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
  private formGetParameter<T>(serviceSelector: T) {
    const getInput: IGetInput = _.get(
      this.description,
      [this.serviceName, `${this.serviceName}InterfacePort`, 'get', 'input'],
      {}
    );
    let parameter = {};
    if (getInput.selector) {
      parameter = { selector: serviceSelector };
    } else if (getInput.serviceSelector) {
      parameter = { serviceSelector };
    }
    return parameter;
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
  private async createSoapClient(url: string, credentials: IOAuthRefreshedCredential): Promise<void> {
    try {
      this.client = await soap.createClientAsync(url, {});
      this.client.addSoapHeader(this.header, this.serviceName, this.namespace, this.xmlns);
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

export { SoapService, ISoapServiceOpts };
