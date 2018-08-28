import { parseString, convertableToString, OptionsV2 } from 'xml2js';

class XMLService {
  /**
   * parse XML to JSON
   *
   * @author dulin
   * @static
   * @param {convertableToString} xml
   * @param {OptionsV2} [options={ trim: true }]
   * @returns
   * @memberof XMLService
   */
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

  /**
   * extract value from a XML string by RegExp
   *
   * @author dulin
   * @static
   * @param {string} xml
   * @param {string} element
   * @returns {(string | undefined)}
   * @memberof XMLService
   */
  public static extractValueFromElement(xml: string, element: string): string | undefined {
    const pattern = `<${element}>(.*?)<\/${element}>`;
    const matcher = new RegExp(pattern, 'g');
    const matchArray: RegExpMatchArray | null = xml.match(matcher);
    if (matchArray && matchArray.length) {
      return matchArray[0].replace(/(<([^>]+)>)/gi, '');
    }
  }
}

export { XMLService };
