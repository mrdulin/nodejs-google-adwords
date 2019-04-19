import * as soap from 'soap';
import request, { OptionsWithUri } from 'request-promise';
import { Omit } from '../../models/core';
import { pd } from 'pretty-data';
import { RegistryService } from '../core';

interface IAdWordsServiceOpts {
  serviceName: string;
  clientCustomerId?: string;
  clientId: string;
  clientSecret: string;
  developerToken: string;
  userAgent: string;
  validateOnly?: boolean;
  partialFailure?: boolean;
  credentials: IOAuthCredential;
  registryService: RegistryService<any>;
}

interface IOAuthCredential {
  access_token?: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
}

interface IOAuthRefreshedCredential extends Required<Omit<IOAuthCredential, 'refresh_token'>> {}

class AdWordsService {
  protected soapClient: soap.Client | undefined;
  private authURL: string = 'https://www.googleapis.com/oauth2/v4/token';
  private namespace: string = 'ns1';
  private xmlns: string = 'https://adwords.google.com/api/adwords/cm/v201809';
  private soapHeader: any;
  private credentials: IOAuthCredential;
  private suffix: string = '?wsdl';
  private url: string = '';
  private serviceName: string = '';
  private clientId: string = '';
  private clientSecret: string = '';
  private verbose: boolean = true;
  private description: any;
  private registryService: RegistryService<any>;

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
    this.registryService = options.registryService;
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.credentials = options.credentials;
    this.serviceName = options.serviceName;
    this.url = `${this.xmlns}/${options.serviceName}${this.suffix}`;
  }

  public getService(service: string) {
    return this.registryService.get(service);
  }

  protected setVerbose(val: boolean) {
    this.verbose = val;
  }

  /**
   * get operation
   *
   * @author dulin
   * @protected
   * @template T
   * @param {T} serviceSelector
   * @returns
   * @memberof AdWordsService
   */
  protected async get<T>(serviceSelector: T) {
    const credentials: IOAuthRefreshedCredential = await this.refreshToken();
    this.credentials.access_token = credentials.access_token;
    await this.createSoapClient(this.url);

    return new Promise((resolve, reject) => {
      if (!this.soapClient) {
        return reject(new Error('soap client does not exist'));
      }
      this.soapClient.get({ serviceSelector }, (error: Error, result: any) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  private async refreshToken(): Promise<IOAuthRefreshedCredential> {
    const options: OptionsWithUri = {
      uri: this.authURL,
      method: 'POST',
      body: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: this.credentials.refresh_token,
        grant_type: 'refresh_token'
      },
      json: true
    };

    return request(options)
      .then(response => {
        console.log('refresh token success. response: ', response);
        return response;
      })
      .catch(error => {
        console.error(error.message);
        return Promise.reject(new Error('refresh token failed.'));
      });
  }

  private async createSoapClient(url: string): Promise<void> {
    try {
      this.soapClient = await soap.createClientAsync(url, {});
      this.soapClient.addSoapHeader(this.soapHeader, this.serviceName, this.namespace, this.xmlns);
      if (!this.credentials.access_token) {
        throw new Error('access_token required.');
      }
      this.soapClient.setSecurity(new soap.BearerSecurity(this.credentials.access_token));
      this.description = this.soapClient.describe();
      this.listenSoapClientEvents();
    } catch (error) {
      console.error(error);
      throw new Error('create soap client failed.');
    }
  }

  private listenSoapClientEvents(): void {
    if (this.soapClient) {
      this.soapClient.on('request', (xml: string, eid: string) => {
        if (this.verbose) {
          console.log('Soap request (Envelope) including headers: ', pd.xml(xml));
          console.log('Soap request exchange id: ', eid);
        }
      });
      this.soapClient.on('message', (xml: string, eid: string) => {
        if (this.verbose) {
          console.log('Soap body contents: ', pd.xml(xml));
        }
      });
      this.soapClient.on('soapError', (error: any, eid: string) => {
        if (this.verbose) {
          console.error(error);
        }
      });
      this.soapClient.on('response', (body: any, response: any, eid: string) => {
        if (this.verbose) {
          console.log('Soap response body: ', pd.xml(body));
          console.log('Soap response: ', pd.json(response));
          console.log('Soap response eid: ', eid);
        }
      });
    }
  }
}

export { AdWordsService, IAdWordsServiceOpts };
