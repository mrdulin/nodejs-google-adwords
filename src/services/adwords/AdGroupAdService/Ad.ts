import { ICustomParameters } from './CustomParameters';
import { IUrlData } from './UrlData';
import { Ad } from './enum/Ad';
import { SystemManagedEntitySource } from './enum/SystemManagedEntitySource';
import { Omit } from '../../../types/core';
import { IAttributes } from '../../../types/adwords/Attributes';
import { IImage } from './Media';
import { IDynamicSettings } from './DynamicSettings';
import { DisplayAdFormatSetting } from './enum/DisplayAdFormatSetting';

interface IAdRaw<Type> {
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
  attributes: IAttributes<Type>;
}

interface IAd<Type = ''> extends Partial<IAdRaw<Type>> {}

/**
 * Caution: Expanded text ads do not use url, displayUrl, finalAppUrls, or devicePreference;
 * setting these fields on an expanded text ad will cause an error.
 *
 * @author dulin
 * @interface IExpandedTextAd
 * @extends {(Partial<Omit<IAd, 'url' | 'displayUrl' | 'finalAppUrls' | 'devicePreference'>>)}
 */
interface IExpandedTextAd
  extends Partial<Omit<IAdRaw<'ExpandedTextAd'>, 'url' | 'displayUrl' | 'finalAppUrls' | 'devicePreference'>> {
  headlinePart1: string;
  headlinePart2: string;
  headlinePart3?: string;
  description: string;
  description2?: string;
  path1?: string;
  path2?: string;
}

interface IResponsiveDisplayAd
  extends Partial<Omit<IAdRaw<'ResponsiveDisplayAd'>, 'url' | 'displayUrl' | 'finalAppUrls' | 'devicePreference'>> {
  marketingImage: Partial<IImage>;
  logoImage: IImage;
  squareMarketingImage: IImage;
  shortHeadline: string;
  longHeadline: string;
  description: string;
  businessName: string;
  mainColor: string;
  accentColor: string;
  allowFlexibleColor: string;
  callToActionText: string;
  dynamicDisplayAdSettings: IDynamicSettings;
  formatSetting: DisplayAdFormatSetting;
}

export { IExpandedTextAd, IResponsiveDisplayAd, IAd };
