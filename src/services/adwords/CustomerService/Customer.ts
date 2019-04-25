import { IConversionTrackingSettings } from './ConversionTrackingSettings';
import { IRemarketingSettings } from './RemarketingSettings';

export interface ICustomer {
  readonly customerId: string;
  currencyCode: string;
  readonly dateTimeZone: string;
  readonly descriptiveName: string;
  readonly canManageClients: boolean;
  readonly testAccount: boolean;
  autoTaggingEnabled: boolean;
  trackingUrlTemplate: string;
  finalUrlSuffix: string;
  parallelTrackingEnabled: boolean;
  conversionTrackingSettings: IConversionTrackingSettings;
  readonly remarketingSettings: IRemarketingSettings;
}
