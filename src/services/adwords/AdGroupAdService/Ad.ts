import { ICustomParameters } from './CustomParameters';
import { IUrlData } from './UrlData';
import { Ad } from './enum/Ad';
import { SystemManagedEntitySource } from './enum/SystemManagedEntitySource';
import { Omit } from '../../../types/core';

interface IAd {
  id: string;
  url: string;
  displayUrl: string;
  finalUrls: string[];
  finalMobileUrls: string[];
  finalAppUrls: string[];
  trackingUrlTemplate: string;
  finalUrlSuffix: string;
  urlCustomParameters: ICustomParameters;
  urlData: IUrlData;
  automated: boolean;
  type: Ad.Type;
  devicePreference: string;
  readonly systemManagedEntitySource: SystemManagedEntitySource;
  'Ad.Type': string;
  attributes: {
    'xsi:type': string;
  };
}

/**
 * Caution: Expanded text ads do not use url, displayUrl, finalAppUrls, or devicePreference;
 * setting these fields on an expanded text ad will cause an error.
 *
 * @author dulin
 * @interface IExpandedTextAd
 * @extends {(Partial<Omit<IAd, 'url' | 'displayUrl' | 'finalAppUrls' | 'devicePreference'>>)}
 */
interface IExpandedTextAd extends Partial<Omit<IAd, 'url' | 'displayUrl' | 'finalAppUrls' | 'devicePreference'>> {
  headlinePart1: string;
  headlinePart2: string;
  headlinePart3?: string;
  description: string;
  description2?: string;
  path1?: string;
  path2?: string;
}

export { IExpandedTextAd };
