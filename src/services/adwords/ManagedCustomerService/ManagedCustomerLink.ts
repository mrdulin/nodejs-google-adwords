import { LinkStatus } from './enum/LinkStatus';

export interface IManagedCustomerLink {
  managerCustomerId: string;
  clientCustomerId: string;
  linkStatus: LinkStatus;
  pendingDescriptiveName: string;
  isHidden: boolean;
}
