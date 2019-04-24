import { IUrlList } from './UrlList';

export interface IUrlData {
  urlId: string;
  finalUrls: IUrlList;
  finalMobileUrls: IUrlList;
  trackingUrlTemplate: string;
}
