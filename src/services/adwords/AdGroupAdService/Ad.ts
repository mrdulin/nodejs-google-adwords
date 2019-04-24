import { ICustomParameters } from './CustomParameters';
import { IUrlData } from './UrlData';
import { Ad } from './enum/Ad';
import { SystemManagedEntitySource } from './enum/SystemManagedEntitySource';

interface IAdRaw {
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
}

interface IAd extends Partial<IAdRaw> {}

export { IAd };
