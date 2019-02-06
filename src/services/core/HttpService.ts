import request, { OptionsWithUri } from 'request-promise';
import _ from 'lodash';

class HttpService {
  public async request(options: OptionsWithUri) {
    const defaultOptions: Pick<OptionsWithUri, 'json' | 'timeout'> = {
      json: true,
      timeout: 10 * 1000
    };
    const finalOptions: OptionsWithUri = _.defaultsDeep(options, defaultOptions);
    return request(finalOptions);
  }
}

export { HttpService, OptionsWithUri };
