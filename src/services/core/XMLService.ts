import { parseString, convertableToString, OptionsV2 } from 'xml2js';

class XMLService {
  public static parseStringPromise(xml: convertableToString, options: OptionsV2 = { trim: true }) {
    return new Promise((resolve, reject) => {
      parseString(xml, options, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }
}

export { XMLService };
